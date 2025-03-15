// "use client";
// import React from "react";
// import GooglePayButton from "@google-pay/button-react";

// export default function Page() {
//   return (
//     <div className="app">
//       <GooglePayButton
//         environment="PRODUCTION"//"TEST"
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
//                   gateway: "example",
//                   gatewayMerchantId: "exampleGatewayMerchantId",
//                 },
//               },
//             },
//           ],
//           merchantInfo: {
//             //"BCR2DN7T3W3ZNJRG",
//             merchantId: "BCR2DN4T2TG37HCH",
//             merchantName: "Elec Shop",

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
//         onPaymentAuthorized={(paymentData) => {
//           console.log("Payment Authorized:", paymentData);
//           return { transactionState: "SUCCESS" };
//         }}
//         existingPaymentMethodRequired={false}
//         buttonColor="black"
//         buttonType="buy"
//       />
//     </div>
//   );
// }
