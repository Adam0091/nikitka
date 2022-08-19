import {useEffect, useState} from "react"
import {Header} from "../../components/Header"
import {ObjectsList} from "../../components/ObjectsList"
import {CAMPUS_URL, OBJECTS_URL, ROLES_URL, TYPES_URL} from "../../constants"
import {getApiResource} from "../../utils/network"

export const HomePage = () => {
  const [data, setData] = useState({types: [], campus: [], roles: []})

  const [objectsData, setObjectsData] = useState([])
  const [filterObjectsData, setFilterObjectsData] = useState([])

  const [filterOption, setFilterOption] = useState({campus: '', type: ''})

  const getResources = async () => {
    const {object_types: types} = await getApiResource(TYPES_URL)
    const {campus} = await getApiResource(CAMPUS_URL)
    const {roles} = await getApiResource(ROLES_URL)
    const {objects} = await getApiResource(OBJECTS_URL)

    setObjectsData(objects);
    setFilterObjectsData(objects)
    setData({types: types, campus: campus, roles: roles})
  }

  const filter = () => {
    let filterData = objectsData;
    if (filterOption.campus !== "") 
      filterData = filterData.filter(item => data.campus[item.campus]?.name === filterOption.campus)
    if (filterOption.type !== "") 
      filterData = filterData.filter(item => data.types[item.type]?.name=== filterOption.type)

    setFilterObjectsData(filterData)
  }

  const updatePage = () => {
    getResources()
  }

  useEffect(() => {
    filter()
  }, [filterOption]);

  useEffect(() => {
    getResources()
  }, []);

  return (
    <div className="page">
      <Header data={data}
        objects={objectsData}
        updatePage={updatePage}
        filterOption={filterOption}
        setFilterOption={setFilterOption}/>
      <ObjectsList objects={filterObjectsData}
        data={data}/>
    </div>
  )
}
