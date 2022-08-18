import {useEffect} from "react"
import {Header} from "../../components/Header"
import {ObjectsList} from "../../components/ObjectsList"
import {BASE_URL} from "../../constants"
import {getApiResource} from "../../utils/network"


export const HomePage = () => {

  const getResources = async (url) => {

    //GET TYPES, GET OBJECT_LIST
    // const res = await getApiResource(url);
    // console.log(res);

  };

  useEffect(() => {
    getResources(BASE_URL);
  }, [])

  return (
    <div className="page">
      <Header/>
      <ObjectsList/>
    </div>
  )
}
