import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QrCode from "@/components/ui/QrCode";
import { QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";
import { LucideCheck, LucideScanQrCode, LucideX } from "lucide-react";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ScanPage() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const qrErrorCallback: QrcodeErrorCallback = useCallback((errMsg, err) => {
    console.error(errMsg);
    console.log(err.type);
  }, []);

  const qrSuccessCallback: QrcodeSuccessCallback = useCallback(
    (decodedText, result) => {
      alert(decodedText);
      console.log(result);
      setSuccess(true);
    },
    []
  );

  return (
    <div className="flex relative flex-col items-center h-svh px-3 pt-5">
      <Link to={"/home"} className="ml-3 mb-5 w-full">
        <LucideX size={30} />
      </Link>
      <div className="flex relative flex-col items-center gap-10 max-w-md">
        <div className="flex flex-col w-full items-center gap-2 ">
          <h1 className="font-semibold text-2xl inline">
            <span>
              <LucideScanQrCode className="inline mr-2" size={30} />
            </span>
            Scan QR Code
          </h1>

          <p className="text-sm">
            Scan QR Code yang terdapat di berbagai stand yang tersedia, kamu
            hanya dapat melakukan 1 kali scan untuk masing-masing stand
          </p>
        </div>
        <QrCode
          config={{
            fps: 25,
            qrbox: { width: 200, height: 200 },
            disableFlip: true,
          }}
          errorCallback={qrErrorCallback}
          successCallback={qrSuccessCallback}
          // cameraId={cameraId}
        />
      </div>

      {success && (
        <div className="w-full h-full absolute top-0 flex justify-center items-center bg-pink-100/50 backdrop-blur-sm px-3">
          <Card className="max-w-[320px] flex flex-col items-center">
            <CardHeader>
              <CardTitle className="text-lg text-center font-medium">
                Poin Berhasil Ditambahkan{" "}
                <LucideCheck className="inline" color="green" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center">
              10 Poin telah ditambahkan ke akunmu.
              <br />
              Kumpulkan poin sebanyak-banyaknya dan menangkan hadiah menarik!
            </CardContent>
            <CardFooter className="w-full">
              <Button className="w-full" onClick={() => navigate("/home")}>
                Kembali ke Beranda
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
