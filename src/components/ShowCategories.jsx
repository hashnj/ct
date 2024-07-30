import { useEffect, useState } from "react";
import { categories } from "../store/products";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { themeState } from "../store/atoms";
import { Edit } from "../assets/Svg";
import { EditC, EditV } from "../store/edit";
import { addC, edit, Show } from "../store/listing";
import EditItem from "./EditItem";
import { ImCross } from "react-icons/im";

export const ShowCategories = () =>{
  const [categorie, setCategories] = useState([]);
  const category = useRecoilValueLoadable(categories);
  const theme = useRecoilValue(themeState);
  const [edt, setEdt] = useRecoilState(EditV);
  const [edtc,setEdtc] = useRecoilState(EditC);
  const [ac, setAddC] = useRecoilState(addC);
  const [ed, setEd] = useRecoilState(edit);
  const [show,setShow] = useRecoilState(Show);


  useEffect(()=>{
    document.body.classList=theme
},[theme])




  useEffect(()=>{
    if(category.state=='hasValue'){
        console.log(category);
        setCategories(category);
    }
  },[category])

if(category.state === 'loading'){
    return <div>Loading</div>
}
if(category.state === 'hasError'){
    return <div>Error</div>
}
if(category.state === 'hasValue'){
    return (
        <div className="absolute z-20 cursor-default text-text top-0 p-36 w-screen h-screen flex justify-center items-center bg-backgrounds/40">
            {ed && <div>
                <div className="z-10" onClick={()=>{
                setEd(false)
            }}> </div> 
            <EditItem/></div>}
          <div className="bg-backgrounds absolute rounded-lg w-4/5 lg:w-3/5 h-4/5 p-8 overflow-hidden  ">
            <div className="text-3xl flex justify-between font-semibold  border-b-2 mx-4 border-primary/60 pb-6 ">
              <div className="w-full text-center underline">Categories Available</div>
              <div 
                className="cursor-pointer hover:text-primary active:text-text bg-text/5  shadow-text  border-inset hover:border m-px hover:m-0 rounded p-2 hover:drop-shadow-[0_0_4px_rgba(0,0,0,0.5)] hover:bg-primary/10 "
                onClick={() => setShow(false)}>
                    <ImCross className="size-6"/>
              </div>
              </div>
              <div className="h-full w-full pb-10 pt-2 scroll-smooth no-scrool overflow-scroll">
                    <div>
                    <table className="w-full">
                    <thead className="text-2xl">
                      <tr>
                        <th className="border-r border-text/40 border-b">S.no.</th>
                        <th className="border-r px-2 border-b border-text/40">Category</th>
                        <th className="border-r px-2 border-b border-text/40">Description</th>
                        <th className="border-b px-2 border-text/40">Edit</th>
                      </tr>
                    </thead>
                    <tbody className="text-lg">
                      {category.contents.categories.map((cat, i) => (
                        <tr key={i}>
                          <td className="border-r border-b p-2 border-text/40 text-center">{i + 1}.</td>
                          <td className="border-r border-b border-text/40 text-center">{cat.name}</td>
                          <td className="text-center border-r border-b border-text/40">{cat.description}</td>
                          <td className="text-center border-b border-text/40"><div className="bg-primary size-6 mx-auto cursor-pointer rounded" onClick={()=>{
                            setEdtc({
                              name:cat.name,
                              description:cat.description,
                              isSubCategory:false,
                              parent:''
                            })
                            setEd(true);
                          }}><Edit/></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <table className="w-full mt-8">
                    <thead className="text-2xl">
                      <tr>
                        <th className="border-r border-text/40 border-b">S.no.</th>
                        <th className="border-r px-2 border-b border-text/40">Category</th>
                        <th className="px-2 border-b border-r border-text/40">SubCategory</th>
                        <th className="border-b px-2 border-r border-text/40">Description</th>
                        <th className="border-b px-2 border-text/40">Edit</th>
                      </tr>
                    </thead>
                    <tbody className="text-lg">
                      {category.contents.subCategories.map((subCat, i) => (
                        <tr key={i}>
                          <td className="text-center border-b p-2 border-r border-text/40">{i + 1}.</td>
                          <td className="text-center border-r border-b border-text/40">
                            {category.contents.categories
                              .filter((e) => e._id === subCat.parent_id)
                              .map((filteredCat) => (
                                <span key={filteredCat._id}>{filteredCat.name}</span>
                              ))}
                          </td>
                          <td className="text-center border-r border-b border-text/40">{subCat.name}</td>
                          <td className="text-center border-b border-r border-text/40">{subCat.description}</td>
                          <td className="text-center border-b border-text/40"><div className="bg-primary rounded size-6 cursor-pointer mx-auto" onClick={()=>{
                            setEdtc({
                              name:subCat.name,
                              description:subCat.description,
                              isSubCategory:true,
                              parent:category.contents.categories
                                .filter((e) => e._id === subCat.parent_id)
                                .map((filteredCat) => (
                                //   console.log(filteredCat.name),
                                  filteredCat.name
                                ))
                            })
                            setEd(true);
                          }}><Edit/></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
            </div>
          </div>
        </div>
      )
    }
}


