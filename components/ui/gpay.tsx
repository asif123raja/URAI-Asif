"use clients";
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loraUrl, setLoraUrl] = useState('');
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const loadGooglePay = () => {
    if (window.google && window.google.payments) {
      const paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });

      const paymentRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['VISA', 'MASTERCARD'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',  // Change this to your actual gateway like 'stripe'
              gatewayMerchantId: 'your-merchant-id',
            },
          },
        }],
        merchantInfo: {
          merchantId: 'your-merchant-id',
          merchantName: 'Your Business Name',
        },
        transactionInfo: {
            totalPriceStatus:"FINAL",
            totalPriceLabel:"total",
            totalPrice:"0.3",
            currencyCode:"USD",
            countryCode:"US"
        },
      };

      const googlePayButton = paymentsClient.createButton({
        onClick: () => handlePayment(paymentsClient, paymentRequest),
      });

      document.getElementById('gpay-button')?.appendChild(googlePayButton);
    }
  };

  const handlePayment = async (paymentsClient: any, paymentRequest: any) => {
    try {
      setIsLoading(true);
      const paymentData = await paymentsClient.loadPaymentData(paymentRequest);

      if (paymentData) {
        console.log('Payment Success:', paymentData);
        setPaymentSuccess(true);
        handleSubmit(); // Proceed with video generation after payment success
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || !paymentSuccess) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          lora_url: loraUrl || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error('Failed to generate video');

      if (!data.videoUrls.length) throw new Error('No video URLs received');

      setVideoUrls(data.videoUrls);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate video');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">AI Video Generator</h1>

        <form onSubmit={(e) => e.preventDefault()} className="mb-8">
          <div className="flex flex-col space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your video prompt..."
              className="p-4 border rounded-lg resize-none h-32"
              disabled={isLoading}
            />
            <input
              type="url"
              value={loraUrl}
              onChange={(e) => setLoraUrl(e.target.value)}
              placeholder="LORA Model URL (optional)"
              className="p-4 border rounded-lg"
              disabled={isLoading}
            />
            <div id="gpay-button" className="mb-4"></div>
          </div>
        </form>

        {error && <div className="text-red-600">{error}</div>}

        {videoUrls.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Generated Videos</h2>
            <div className="grid gap-4">
              {videoUrls.map((url, index) => (
                <video key={index} controls src={url} className="w-full h-auto rounded-lg" />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
