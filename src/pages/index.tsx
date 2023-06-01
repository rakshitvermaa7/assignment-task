//useSWR allows the use of SWR inside function components
import useSWR from "swr";
import { useState, useEffect } from "react";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Data {
  block_number: string;
  from_address: string;
  to_address: string;
  id: string;
}

export default function Index() {
  const [jsonData, setJsonData] = useState<Data[]>([]);
  const { data, error, ...props } = useSWR("/api/get-data", fetcher);

  useEffect(() => {
    if (data) setJsonData(JSON.parse(data));
  }, [data]);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file

  return (
    <div>
      <h1>My Framework from file</h1>
      {jsonData?.map((d, idx) => (
        <div className="" key={idx}>
          <h1>{d.block_number}</h1>
          <h1>{d.from_address}</h1>
          <h1>{d.to_address}</h1>
        </div>
      ))}
    </div>
  );
}
