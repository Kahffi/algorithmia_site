import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";

export default function QrScanner() {
  console.log(useDevices(), "use Devicess");
  console.log(navigator.mediaDevices);
  // const [cameraReady, setCameraReady] = useState(false);
  // useEffect(() => {
  //   const stream = async () =>
  //     await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  //   stream().then(() => setCameraReady(true));
  // }, []);
  return <>{<Scanner onScan={(result) => console.log(result)} />}</>;
}
