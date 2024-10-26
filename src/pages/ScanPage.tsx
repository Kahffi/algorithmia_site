import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QrCode from "@/components/ui/QrCode";
import { UserContext } from "@/context/UserContext";
import { QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";
import {
  LucideCheck,
  LucideScanQrCode,
  LucideX,
  LucideXOctagon,
} from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ScanPage() {
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext)!;

  useEffect(() => {
    if (!state) {
      navigate("/auth/signin");
    }
  }, [state]);

  async function handleQRSubmit(url: string) {
    try {
      // setIsPending(true);
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ userId: state._id }),
        mode: "cors",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const data = await res.json();

      if (data.status === 200) dispatch({ type: "ADD_POINT" });
      setSubmitStatus(data.status);
    } catch (e) {
      if (!(e instanceof Error)) {
        console.error(e);
      }
      console.error(e);
      // if ((e as Error).message.includes("400")) {
      //   form.setError("username", {
      //     message: "Nama Pengguna atau Kata Sandi salah, silahkan coba lagi",
      //   });
      //   form.setError("password", {
      //     message: "Nama Pengguna atau Kata Sandi salah, silahkan coba lagi",
      //   });
      // }
    } finally {
      // setIsPending(false);
    }
  }

  const qrErrorCallback: QrcodeErrorCallback = useCallback((errMsg, err) => {
    console.error(errMsg);
    console.log(err.type);
  }, []);

  const qrSuccessCallback: QrcodeSuccessCallback = useCallback(
    (decodedText, result) => {
      console.log(result);
      handleQRSubmit(decodedText);
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
            QR Code Scanner
          </h1>

          <p className="text-sm">
            Scan the QR Code located at the various booths available <br />
            You can only scan once for each booth.
          </p>
        </div>
        <div className="w-full">
          <QrCode
            config={{
              fps: 25,
              qrbox: { width: 280, height: 280 },
              disableFlip: true,
            }}
            errorCallback={qrErrorCallback}
            successCallback={qrSuccessCallback}
            // cameraId={cameraId}
          />
        </div>
      </div>

      {/* overlay */}
      {submitStatus && (
        <div className="w-full h-full absolute top-0 flex justify-center items-center bg-pink-100/50 backdrop-blur-sm px-3 pb-10">
          <Card className="max-w-[320px] flex flex-col items-center">
            <CardHeader>
              <CardTitle className="text-lg text-center font-medium">
                {submitStatus === 200 ? (
                  <>
                    <LucideCheck className="inline mr-2" color="green" />
                    Points Has Been Successfully Added
                  </>
                ) : submitStatus === 400 ? (
                  <>
                    <LucideXOctagon className="inline mr-2" color="red" />
                    You Have Scanned this QR Code Before
                  </>
                ) : (
                  "Unknown Error Occured"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center">
              {submitStatus === 200 ? (
                <>
                  10 points have been added to your account.
                  <br />
                  Collect as many points as possible and win exciting prizes!
                </>
              ) : submitStatus === 400 ? (
                <>
                  You have earned points from this booth. Please visit and scan
                  the QR codes at booths you haven't visited yet to earn
                  additional points.
                </>
              ) : (
                "Unknown Error Occured. Please try again later"
              )}
            </CardContent>
            <CardFooter className="w-full">
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={() => navigate("/home")}
              >
                Back to Home Page
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
