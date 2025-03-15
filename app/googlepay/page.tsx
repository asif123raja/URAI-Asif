"use client";
import React from "react";
import GooglePayButton from "@google-pay/button-react";

export default function Page() {
  return (
    <div className="app">
      <GooglePayButton
        environment="PRODUCTION"//"TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            //"BCR2DN7T3W3ZNJRG",
            merchantId: "BCR2DN4T2TG37HCH",
            merchantName: "Elec Shop",

          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "0.3",
            currencyCode: "USD",
            countryCode: "US",
          },
          shippingAddressRequired: true,
          callbackIntents: ["PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("Load Payment Data:", paymentRequest);
        }}
        onPaymentAuthorized={(paymentData) => {
          console.log("Payment Authorized:", paymentData);
          return { transactionState: "SUCCESS" };
        }}
        existingPaymentMethodRequired={false}
        buttonColor="black"
        buttonType="buy"
      />
    </div>
  );
}
// "use client";
// "use client";
// import React, { useRef, useEffect } from "react";

// declare global {
//   interface Window {
//     paypal: any;
//   }
// }

// export default function Paypal(): JSX.Element {
//   const paypalRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!window.paypal || !paypalRef.current) return;

//     window.paypal
//       .Buttons({
//         createOrder: (data: any, actions: any) => {
//           return actions.order.create({
//             intent: "CAPTURE",
//             purchase_units: [
//               {
//                 description: "Cool looking table",
//                 amount: {
//                   currency_code: "CAD",
//                   value: 650.0,
//                 },
//               },
//             ],
//           });
//         },
//         onApprove: async (data: any, actions: any) => {
//           try {
//             const order = await actions.order.capture();
//             console.log("Order Approved:", order);
//           } catch (error) {
//             console.error("Error capturing order:", error);
//           }
//         },
//         onError: (err: any) => {
//           console.error("PayPal Error:", err);
//         },
//       })
//       .render(paypalRef.current);
//   }, []);

//   return (
//     <div>
//       <div ref={paypalRef}></div>
//     </div>
//   );
// }


// "use client";
// import React, { useState } from "react";
// import GooglePayButton from "@google-pay/button-react";

// export default function Page() {
//   const [isPaid, setIsPaid] = useState(false);

//   const handlePaymentSuccess = (paymentData: any) => {
//     console.log("Payment Authorized:", paymentData);
//     setIsPaid(true); // Unlocks the Generate Video button
//     return { transactionState: "SUCCESS" };
//   };

//   const handleGenerateVideo = () => {
//     if (isPaid) {
//       console.log("Generating video...");
//       alert("Video generation started!");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Buy & Generate Video</h1>
      
//       {/* Google Pay Button */}
//       <GooglePayButton
//         environment="TEST" // Change to "PRODUCTION" when going live
//         paymentRequest={{
//           apiVersion: 2,
//           apiVersionMinor: 0,
//           allowedPaymentMethods: [
//             {
//               type: "CARD",
//               parameters: {
//                 allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
//                 allowedCardNetworks: ["MASTERCARD", "VISA"],
//               },
//               tokenizationSpecification: {
//                 type: "PAYMENT_GATEWAY",
//                 parameters: {
//                   gateway: "example", // Replace with your actual gateway
//                   gatewayMerchantId: "example ", // Use your Google Pay Merchant ID
//                 },
//               },
//             },
//           ],
//           merchantInfo: {
//             merchantId: "BCR2DN7T3W3ZNJRG", // Replace with your real Merchant ID
//             merchantName: "Asif Company and Limited",
//           },
//           transactionInfo: {
//             totalPriceStatus: "FINAL",
//             totalPriceLabel: "Total",
//             totalPrice: "0.3",
//             currencyCode: "USD",
//             countryCode: "US",
//           },
//           shippingAddressRequired: true,
//           callbackIntents: ["PAYMENT_AUTHORIZATION"],
//         }}
//         onLoadPaymentData={(paymentRequest) => {
//           console.log("Load Payment Data:", paymentRequest);
//         }}
//         onPaymentAuthorized={handlePaymentSuccess}
//         existingPaymentMethodRequired={false}
//         buttonColor="black"
//         buttonType="buy"
//       />

//       {/* Generate Video Button - Only Active After Payment */}
//       <button
//         onClick={handleGenerateVideo}
//         disabled={!isPaid}
//         className={`mt-4 px-6 py-3 text-white font-bold rounded-lg 
//           ${isPaid ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
//       >
//         Generate Video
//       </button>
//     </div>
//   );
// }
