import { useCallback, useState } from "react";
type DoPost<T> = (url: string, body: T) => void;

function usePost<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isPending, setIsPending] = useState(false);

  const doPost = useCallback<DoPost<T>>(async (url: string, body: T) => {
    try {
      setIsPending(true);
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
        mode: "cors",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const data = await res.json();

      if (data.status === 200) {
        setData(data);
      } else throw new Error(data.status);
    } catch (e) {
      setError(e);
    } finally {
      setIsPending(false);
    }
  }, []);

  //   async function doPost<T>(url: string, body: T) {
  //     try {
  //       setIsPending(true);
  //       const res = await fetch(url, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         method: "POST",
  //         body: JSON.stringify(body),
  //         mode: "cors",
  //       });
  //       if (!res.ok) {
  //         const errorData = await res.json();
  //         throw new Error(errorData.message);
  //       }
  //       const data = await res.json();

  //       if (data.status === 200) {
  //         setData(data);
  //       } else throw new Error(data.message);
  //     } catch (e) {
  //       setError(e);
  //     } finally {
  //       setIsPending(false);
  //     }
  //   }

  return { data, error, isPending, doPost };
}

export default usePost;
