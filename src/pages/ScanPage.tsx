import QrCode from "@/components/ui/QrCode";
import { QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";
import { useCallback } from "react";

export default function ScanPage() {
  const qrErrorCallback: QrcodeErrorCallback = useCallback((errMsg, err) => {
    console.error(errMsg);
    console.log(err.type);
  }, []);

  const qrSuccessCallback: QrcodeSuccessCallback = useCallback(
    (decodedText, result) => {
      alert(decodedText);
      console.log(result);
    },
    []
  );

  return (
    <div>
      <QrCode
        config={{ fps: 25, qrbox: { width: 280, height: 280 } }}
        errorCallback={qrErrorCallback}
        successCallback={qrSuccessCallback}
        // cameraId={cameraId}
      />
    </div>
  );
}
