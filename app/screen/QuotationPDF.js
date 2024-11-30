import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { manipulateAsync } from "expo-image-manipulator";
import { Asset } from "expo-asset";

const QuotationPDF = forwardRef((props, ref) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchImageData = async (uri) => {
      const asset = Asset.fromModule(require("../assets/modalogo.jpg"));
      const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
        base64: true,
      });
      setImage(image);
    };
    fetchImageData();
  }, []);

  useImperativeHandle(ref, () => ({
    generateHtml: () => {
      const {
        windowData,
        vat,
        installation,
        customerName,
        quotationNo,
        totalPrice,
        customerData,
      } = props;
      const today = new Date();
      const fifteenDaysLater = new Date();
      fifteenDaysLater.setDate(today.getDate() + 15);

      const formattedToday = today.toISOString().split("T")[0];
      const formattedFifteenDaysLater = fifteenDaysLater
        .toISOString()
        .split("T")[0];

      const totalAmount =
        parseFloat(totalPrice) + parseFloat(installation) + parseFloat(vat);

      const customer =
        customerData &&
        customerData.find((data) => data?.Name || id == customerName);
      console.log("customer", customer);

      // Generate HTML content as string

      const htmlContent = `
      <html>
        <head>
          <style>
            .container_div_quotationpfd p { margin: 0; padding: 0; font-size: 15px; }
            .container_div_quotationpfd { margin: 11px; color: #000; }
            .container_row_quotationpdf_header { display: flex; justify-content: space-between; align-items: center; }
            .container_row_div_pdf2 { display: flex; flex-direction: column; }
            .container_second_row_div_pdf { margin-top: 1px; }
            .container_table1_row_div_pdf th, .container_table1_row_div_pdf td, .container_table2_row_div_pdf th, .container_table2_row_div_pdf td { border: 1px solid #000; padding: 5px; }
            .container_table1_row_div_pdf th, .container_table2_row_div_pdf th { background-color: yellow;  }
            .remark { color: red; font-size: 20px; font-weight: bold; margin-top: 5px; }
            .container_fifth_row_div_pdf { display: flex; justify-content: space-between; }
            .container_sixth_row_div_pdf { display: flex; justify-content: center; font-size: 20px; font-weight: bold; color: rgb(112, 6, 6); margin-top: 20px; }
            .container_seprate_moda_approved { display: flex; justify-content: space-between; margin-top: 10px; }
            .container_third_row_div_pdf, .container_forth_row_div_pdf { display: flex; justify-content: space-between; }
            .conatiner_text_condtion_price, .container_amount_pdf { display: flex; flex-direction: column; align-items: flex-start; font-size: 18px; font-weight: bold; }
            .conatiner_text_condtion { font-size: 20px; font-weight: bold; }
            @page { margin: 5mm 5mm; }
             .avoid-page-break { page-break-inside: avoid; }
          </style>
        </head>
        <body>
          <div class="container_div_quotationpfd">
            <div class="container_row_quotationpdf_header">
              <div>
                <span style="font-size: 16px; font-weight: bold;">Moda Home Solutions Co. Ltd</span>
                <p>82/7 M001 NONGPURE</p>
                <p>BABGLAMUNG CHONBURI</p>
                <p>20150 PATTAYA THAILAND</p>
                <p>TEL: 061 5300696</p>
                <p>info@modahome.asia</p>
                <p>Tax id: 0205558015088</p>
              </div>
              <div>
                <p>Customer Name : ${customer?.Name}</p>
                <p>Customer Phone : ${customer?.Phone_no}</p>
                <p>Customer Email :${customer?.Email}</p>
                <p>Customer Address: ${customer?.Address}</p>
              </div>
              <div>
                <img  src="data:image/jpeg;base64,${
                  image.base64
                }" alt="Logo" style="width: 150px;" />
              </div>
            </div>
            <div class="container_second_row_div_pdf">
              <table class="container_table1_row_div_pdf">
                <thead>
                  <tr >
                    <th style="width: 20vw">Customer No.</th>
                    <th style="width: 24vw">Quotation No.</th>
                    <th style="width: 24vw">Date</th>
                    <th style="width: 24vw">Expire On</th>
                    <th style="width: 30vw">Moda Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="width: 20vw">${customer.id}</td>
                    <td style="width: 24vw">${quotationNo}</td>
                    <td style="width: 24vw"> ${formattedToday}</td>
                    <td style="width: 24vw">${formattedFifteenDaysLater}</td>
                    <td style="width: 30vw">+66 83 907 7186</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="container_second_row_div_pdf">
              <table class="container_table2_row_div_pdf">
                <thead style=" display: table-row-group">
                  <tr class="avoid-page-break">
                    <th>Description</th>
                    <th>Material</th>
                    <th>Glass Color</th>
                    <th>Glass Thickness</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Price after Discount</th>
                  </tr>
                </thead>
                <tbody>
                  ${windowData
                    .map(
                      (data) => `
                    <tr class="avoid-page-break">
                      <td>Material: ${data.Material}, ${
                        data.MosquitoNet_Design
                          ? `MosquitoNet Design: ${data.MosquitoNet_Design}, MosquitoNet Color: ${data.Mosquito_Net_Color}`
                          : ""
                      }, Glass Color: ${data.Glass_Color},Glass Thickness: ${
                        data.Glass_Thickness
                      },Height: ${data.Height},Width: ${data.Width}</td>
                      <td>${data.Material}</td>
                      <td>${data.Glass_Color}</td>
                      <td>${data.Glass_Thickness}</td>
                      <td>${data.Height}</td>
                      <td>${data.Width}</td>
                      <td>${(
                        parseFloat(data.Total_Price) / parseInt(data.Quantity)
                      ).toFixed(2)}</td>
                      <td>${data.Quantity}</td>
                      <td>${data.Total_Price}</td>
                      <td>${data.Price_After_discount || data.Price}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            <div class="remark"><span>Remarks</span></div>
            <div class="container_third_row_div_pdf">
              <div>
                <p>1 - UPVC profile warranty for 10 years.</p>
                <p>2 - Hardware warranty for 2 years.</p>
                <p>3 - Quotation as a purchase order and part of the contract</p>
                <p>4 - Once signed order, Production will start when received first deposit.</p>
                <p>5 - After receiving the deposit, Installation about 15-30 days.</p>
                <p>6 - A proprietary product of the company until payment is completed.</p>
                <p>7 - Cement work not include on quotation.</p>
                <p>8 - Finished products must have a wide range and height + -0.1-0.5 cm.</p>
                <p>9 - Less than one square meter, the company accounted for one sq.m / price does not include demolition. / price does not include demolition.</p>
              </div>
              <div class="container_amount_pdf">
                <div>Total : ${totalPrice}</div>
                <div class="border_button"></div>
                <div>Installation : ${installation.toFixed(2)}</div>
                <div class="border_button"></div>
                <div>Vat : ${vat}</div>
                <div class="border_button"></div>
                <div>Total Price :${totalAmount.toFixed(2)}</div>
                <div class="border_button"></div>
              </div>
            </div>
            <div class="remark"><span class="remark">Condition for Payments.</span></div>
            <div class="container_forth_row_div_pdf">
              <div class="conatiner_text_condtion">
                <p>1 - 50% advance deposit at the time of confirmation of proforma invoice.</p>
                <p>2 - 40% goods delivery at project.</p>
                <p>3 - 10% when finished installation.</p>
              </div>
              <div class="conatiner_text_condtion_price">
                <p>${(totalAmount * (50 / 100)).toFixed(2)}</p>
                <p>${(totalAmount * (40 / 100)).toFixed(2)}</p>
                <p>${(totalAmount * (10 / 100)).toFixed(2)}</p>
              </div>
            </div>
            <div class="container_seprate_moda_approved">
              <span>Approved by Customer</span>
              <span>Moda Home Solutions</span>
            </div>
            <div class="container_fifth_row_div_pdf">
              <div class="margin_left"><p>Authorised Signatory </p></div>
              <div class="flex_end">Authorised Signatory</div>
            </div>
            <div class="container_sixth_row_div_pdf"><span>** This Quotation is valid for 15 days **</span></div>
          </div>
        </body>
      </html>
    `;

      return htmlContent;
    },
  }));
});

export default QuotationPDF;
