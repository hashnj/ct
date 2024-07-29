import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { SideBar } from "../components/SideBar";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import EditItem from "../components/EditItem";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { addC, addP, edit, Show } from "../store/listing";
import { PnL } from "../components/PnL";
import { EditC, EditV } from "../store/edit";
import { categories } from "../store/products";
import { Edit } from "../assets/Svg";
import { sideBar } from "../store/dash";
import { themeState } from "../store/atoms";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Listing = () => {
  const [ap, setAddP] = useRecoilState(addP);
  const [ac, setAddC] = useRecoilState(addC);
  const [ed, setEd] = useRecoilState(edit);
  const [show, setShow] = useRecoilState(Show);
  const [categorie, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [edt, setEdt] = useRecoilState(EditV);
  const [edtc,setEdtc] = useRecoilState(EditC);
  const category = useRecoilValueLoadable(categories);
  const active = useRecoilValue(sideBar);
  const theme = useRecoilValue(themeState)

  useEffect(() => {
    if (show) {
      setLoading(true);
      if (category.state === 'hasValue') {
        console.log(category)
        setCategories(category.contents);
        setLoading(false);
      } else if (category.state === 'hasError') {
        setError('Error loading categories');
        setLoading(false);
      }
    }
    console.log(categorie)
  }, [show, category.state, category.contents]);

  useEffect(()=>{
    document.body.classList=theme
  },[theme])

  if (ap) {
    return <AddProduct />;
  }

  if (ac) {
    return <AddCategory />;
  }

  if (ed) {
    return <EditItem />;
  }

  return (
    <div className="w-screen min-h-screen bg-backgrounds  h-full relative text-text flex justify-center items-center">
      <Nav />
      <SideBar top="Your-Listings" />
      {show && (
        <div className="absolute cursor-default top-0 p-36 w-screen min-h-screen h-full flex justify-center items-center bg-text/40">
          <div className="bg-backgrounds absolute rounded-lg w-4/5 lg:w-3/5 h-4/5 p-8 overflow-hidden  ">
            <div className="text-3xl flex justify-between font-semibold  border-b-2 mx-4 border-primary/60 pb-6 ">
              <div className="w-full text-center underline">Categories Available</div>
              <div className="cursor-pointer hover:text-primary/70 active:text-primary" onClick={() => setShow(false)}>X</div>
            </div>
            <div className="h-full w-full pb-10 pt-2 scroll-smooth no-scrool overflow-scroll">
              {loading ? (
                <div className="bg-background "><AiOutlineLoading3Quarters className="animate-spin"/></div>
              ) : (
                (categorie && categorie.categories && categorie.subCategories) ? (
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
                      {categorie.categories.map((cat, i) => (
                        <tr key={i}>
                          <td className="border-r border-b p-2 border-text/40 text-center">{i + 1}.</td>
                          <td className="border-r border-b border-text/40 text-center">{cat.name}</td>
                          <td className="text-center border-r border-b border-text/40">{cat.description}</td>
                          <td className="text-center border-b border-text/40"><div className="bg-primary size-6 mx-auto rounded" onClick={()=>{
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
                      {categorie.subCategories.map((subCat, i) => (
                        <tr key={i}>
                          <td className="text-center border-b p-2 border-r border-text/40">{i + 1}.</td>
                          <td className="text-center border-r border-b border-text/40">
                            {categorie.categories
                              .filter((e) => e._id === subCat.parent_id)
                              .map((filteredCat) => (
                                <span key={filteredCat._id}>{filteredCat.name}</span>
                              ))}
                          </td>
                          <td className="text-center border-r border-b border-text/40">{subCat.name}</td>
                          <td className="text-center border-b border-r border-text/40">{subCat.description}</td>
                          <td className="text-center border-b border-text/40"><div className="bg-primary rounded size-6 mx-auto" onClick={()=>{
                            setEdtc({
                              name:subCat.name,
                              description:subCat.description,
                              isSubCategory:true,
                              parent:categorie.categories
                                .filter((e) => e._id === subCat.parent_id)
                                .map((filteredCat) => (
                                  console.log(filteredCat.name),
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
                ) : (
                  <div>{error && <div className="text-red-500">{error}</div>}</div>
                )
              )}
            </div>
          </div>
        </div>
      )}
      <div className={`h-full transition-all duration-300 ${active?' w-3/5 lg:w-4/5 sm:ml-56 ' : ' w-4/5 md:w-5/6 '} mt-14 md:mt-20 text-text `}>
        <div className="grid  sm:grid-cols-2 lg:grid-cols-2 gap-2 h-1/4">
          <div className="p-4 m-2 bg-background rounded-xl shadow-text/30 hover:shadow-primary shadow-[0_0_4px]">
            <div className="text-primary w-full flex flex-col justify-between  font-serif text-2xl md:text-3xl">
              <div className="text-center cursor-default">Add Products</div>
              <div
                className="cursor-pointer hover:bg-primary hover:text-background hover:border-background/50 active:text-backgrounds active:border-2 active:border-text border-text/50 border w-3/4 mx-auto md:w-full flex justify-center items-center rounded-md pb-2 scale-80 text-5xl h-12 my-auto"
                onClick={() => {
                  setAddP(true);
                }}
              >
                +
              </div>
            </div>
            <div className="text-xl text-center text-text/60 font-semibold"></div>
          </div>
          <div className="p-4 m-2 bg-background rounded-xl hover:shadow-primary shadow-text/30  shadow-[0_0_4px]">
            <div className="text-primary flex justify-between flex-col font-serif text-2xl md:text-3xl">
              <div className="text-center">Add Category</div>
              <div
                className="cursor-pointer hover:bg-primary hover:text-background hover:border-background/50 active:text-backgrounds active:border-2 active:border-text border-text/50 border flex w-3/4 mx-auto md:w-full justify-center items-center rounded-md pb-2 scale-80 text-5xl h-12 my-auto"
                onClick={() => {
                  setAddC(true);
                }}
              >
                +
              </div>
            </div>
            <div className="text-xl text-center text-text/60 font-semibold"></div>
          </div>
          {/* 
          <div className="p-4 m-2 bg-background rounded-xl hover:shadow-primary shadow-text/30 shadow-[0_0_4px]">
            <div className="text-primary flex flex-col justify-between items-center font-serif text-2xl md:text-3xl">
              <div className="text-center">Edit Listings</div>
              <div
                className="cursor-pointer hover:bg-primary hover:text-background hover:border-background/50 active:text-backgrounds active:border-2 active:border-text border-text/50 border flex justify-center items-center w-3/4 mx-auto md:w-full rounded-md pb-2 scale-80 text-5xl h-12 my-auto"
                onClick={() => {
                  setEdt((prev) => ({
                    ...prev,
                    category: "",
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    image: "",
                  }));
                  setEd(true);
                }}
              >
                +
              </div>
            </div>
            <div className="text-xl text-center text-text/60 font-semibold"></div>
          </div> */}
        </div>
        <div className="flex justify-between">
        <div className="text-primary font-serif ml-4 mt-2 text-2xl md:text-3xl">
            Your Products And Listings
          </div>
          <div 
          className="p-2 mr-2 text-primary cursor-pointer bg-background hover:bg-primary/80 shadow-text/30 hover:text-background hover:border-background/50 active:text-backgrounds active:border-2 active:border-text flex justify-between items-center rounded-xl  hover:shadow-primary shadow-[0_0_4px]"
          onClick={() => {
            setShow(true);
          }}>
            <div className=" flex justify-between  items-center flex-col font-serif text-lg md:text-lg" >
              <div
                className="text-center"
              >
                Categories
              </div>
            </div>
          </div>
          </div>
        <div className="p-4 m-2 bg-background h-1/2 rounded-xl shadow-primary/35 overflow-scroll no-scrool shadow-[0_0_7px]">
          
          <PnL />
        </div>
      </div>
    </div>
  );
};