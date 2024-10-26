import {
  Html5Qrcode,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { Html5QrcodeCameraScanConfig } from "html5-qrcode/esm/html5-qrcode";
import { useEffect, useState } from "react";

type Props = {
  successCallback: QrcodeSuccessCallback;
  errorCallback: QrcodeErrorCallback;
  config: Html5QrcodeCameraScanConfig;
};

export default function QrCode({
  successCallback,
  errorCallback,
  config,
}: Props) {
  const [cameraId, setCameraId] = useState<string>("");

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        console.log(devices);
        if (devices && devices.length) {
          if (devices.length === 2) {
            setCameraId(devices[1].id);
          } else {
            setCameraId(devices[0].id);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (cameraId === "") return;
    const html5QrCode = new Html5Qrcode("reader", true);

    html5QrCode.start(
      { deviceId: { exact: cameraId } },
      config,
      successCallback,
      errorCallback
    );
    return () => {
      html5QrCode
        .stop()
        .then((ignore) => {
          console.log("scan stopped", ignore);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  }, [successCallback, errorCallback, config, cameraId]);

  return (
    <>
      {cameraId !== "" ? (
        <div
          id="reader"
          className="w-full rounded-md overflow-hidden shadow-md"
        ></div>
      ) : (
        <div className="flex justify-center items-center flex-1">
          <p>Izinkan kamera untuk menggunakan fitur ini</p>
        </div>
      )}
    </>
  );
}
