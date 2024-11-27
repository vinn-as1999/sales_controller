import React, { useEffect, useContext, useState } from 'react'
import { MdLibraryAdd } from "react-icons/md"
import { IoIosCloseCircle } from "react-icons/io"
import { ProductsContext } from '../contexts/ProductsContext.jsx'
import '../../../styles/Inventory.css'

const user_id = localStorage.getItem('id');
const username = localStorage.getItem('username');
const queryUrl = `http://localhost:3333/api/inventory/${user_id}`

function Inventory() {
  const {products, setProducts} = useContext(ProductsContext)
  const [visibleIndex, setVisibleIndex] = useState({});
  const [visibleSubIndex, setVisibleSubIndex] = useState({});
  const [visibleSubValue, setVisibleSubValue] = useState({});
  const [valor, setValor] = useState();
  
  // Exemplo de estrutura de list atualizada para suportar subinventários nos itens
  const [list, setList] = useState({});


  async function getInventory() {
    try {
      console.log(queryUrl)
      const response = await fetch(queryUrl, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
  
      if (!response.ok) {
        console.log('Erro ao buscar dados', response.status, response)
        return;
      }
  
      const data = await response.json();
      const inventory = data[0].inventory;

      console.log('Server response: ', inventory)
      if (JSON.stringify(inventory) !== JSON.stringify(list)) {
        setList(inventory);
      }

    } catch (error) {
      console.log("Network error: ", error);
      return;
    }
  };


  async function insertInventory(inventory) {
    console.log("InsertInventory chamada: ", inventory)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id,
          username,
          inventory: inventory
        })
      });
  
      if (!response.ok) {
        console.log("Erro ao inserir inventário, insertInventory")
        return;
      }
  
      const data = await response.json();
      console.log('Server response: ', data)

    } catch (error) {
      console.log("Network error: ", error)
    }
  };

  async function deleteCategory(category) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id,
        username,
        inventory: category
      })
    });

    if (!response.ok) {
      console.log("Erro: ", response.status, response)
      return;
    }

    const data = await response.json();

    console.log("Server response: ", data)
  };


  function invInterface() {
    return {
      addInv(newItem) {
        if (!newItem || !newItem || !newItem.trim()) {
          console.log('Campo não fornecido')
          return;
        }

        setList((prev) => {
          const updatedList = {...prev, [newItem]: {}}
          console.log(updatedList)
          return updatedList;
        })
      },


      addSubInv(loc, newItem) {
        if (!loc || !newItem || !newItem.trim()) {
          console.log('Campo não fornecido')
          return;
        }

        setList((prev) => {
          const subLoc = prev[loc]
          const updatedList = {
            ...prev,
            [loc]: {
              ...subLoc,
              [newItem]: {}
            }
          }
          return updatedList
        })
      },


      addSubVal(loc, subloc, newItem) {
        const noField = !loc || !subloc || !newItem || !newItem.trim()
        if (noField) {
          return;
        }

        setList((prev) => {
          const subLoc = prev[loc]
          const subValue = prev[loc][subloc]
          const updatedList = {
            ...prev,
            [loc]: {
              ...subLoc,
              [subloc]: {
                ...subValue,
                [newItem]: []
              }
            }
          }

          return updatedList;
        })
      },


      addSubItem(loc, subloc, value, newItem) {
        const noField = !loc || !subloc || !value || !newItem || !newItem.trim()
        if (noField) {
          return;
        }

        setList((prev) => {
          const subLoc = prev[loc]
          const subValue = prev[loc][subloc]
          const subItem = prev[loc][subloc][value]

          const updatedList = {
            ...prev,
            [loc]: {
              ...subLoc,
              [subloc]: {
                ...subValue,
                [value]: [
                  ...subItem,
                  newItem
                ]
              }
            }
          }

          return updatedList;
        })
      },


      deleteSubItem(loc, subloc, value, item) {
        setList((prev) => {
          const updatedList = {...prev}
          const arr = updatedList[loc][subloc][value]
          const updatedArr = arr.filter((it) => it !== item)

          updatedList[loc][subloc][value] = [updatedArr]
          console.log(updatedList)
          return updatedList;
        })
      },


      deleteSubVal(loc, subloc, item) {
        if (!loc || !subloc || !item || !item.trim()) {
          return;
        }

        setList((prev) => {
          const myList = {...prev}
          delete myList[loc][subloc][item]

          return myList;
        })
      },


      deleteSubInv(loc, item) {
        if (!loc || !item || !item.trim()) {
          return;
        }

        setList((prev) => {
          const myList = {...prev}
          delete myList[loc][item]

          return myList;
        })
      },

      deleteInv(loc) {
        if (!loc || !loc.trim()) {
          return;
        }

        console.log('o loc aqui', loc)

        setList((prev) => {
          const myList = {...prev}
          deleteCategory(loc)
          delete myList[loc]

          insertInventory(myList)

          return myList;
        })
      }
    }
  };

  // Função para alternar a visibilidade dos inventários principais
  function editWH(index) {
    console.log('o index ', index)
    setVisibleIndex(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Função para alternar a visibilidade dos subinventários
  function editSubWH(subloc) {
    console.log('o subloc ', subloc)
    setVisibleSubIndex(prev => ({ ...prev, [subloc]: !prev[subloc] }));
  };

  // Função para alternar a visibilidade dos valores de subinventário
  function editSubValue(item) {
    console.log('o item', item)
    setVisibleSubValue(prev => ({ ...prev, [item]: !prev[item] }));
  };

  useEffect(() => {
    getInventory()

    return () => {}
  }, [])

  useEffect(() => {
    let isMounted = true
    if (Object.keys(list).length < 1) return;

    const insertData = async () => {
      await insertInventory(list);
    };
  
    insertData();
    
    return () => {isMounted = false}
  }, [list]);
  

  const inv = invInterface();

  return (
    <>
      <main className='inventoryMain'>
        <section>
          <ul className='WH'>
            {list && Object.keys(list).map((loc, index) => (
              <div key={loc}>
                <div className='subInvDiv'>
                  <div className="bttnsDiv">
                    <li onClick={() => editWH(index)}>{loc.toLowerCase()}</li>
                    {loc && <IoIosCloseCircle title='Remover endereço' className='xButton' tabIndex={1} onClick={() => inv.deleteInv(loc)} />}
                  </div>
                </div>
                {visibleIndex[index] && ( // Mantém o inventário aberto
                  <ul>
                    {Object.entries(list[loc]).map(([subloc, values]) => (
                      <div key={subloc}>

                        <div className='subInvDiv'>
                          <div className="bttnsDiv">
                            <li onClick={() => editSubWH(subloc)}>{subloc.toLowerCase()}</li>
                            {subloc && <IoIosCloseCircle title='Remover endereço' className='xButton' tabIndex={1} onClick={() => inv.deleteSubInv(loc, subloc)} />}
                          </div>
                        </div>

                        {visibleSubIndex[subloc] && ( // Mantém os subinventários abertos
                          <ul>
                            {Object.entries(values).map(([value, subValues], idx) => (
                              <div key={value}>
                                <div className='bttnsDiv'>
                                  <li onClick={() => editSubValue(value)}>{value.toLowerCase()}</li>
                                  {value && <IoIosCloseCircle title='Remover endereço' className='xButton' tabIndex={1} onClick={() => inv.deleteSubVal(loc, subloc, value)} />}
                                </div>
                                {visibleSubValue[value] && ( // Exibe os subitens
                                  <ul>
                                    {subValues.map((subValue, subIdx) => (

                                      <div className='bttnsDiv'>
                                        <li key={subIdx}>{subValue}</li>
                                        {subValue && <IoIosCloseCircle title='Remover endereço' className='xButton' tabIndex={1}
                                          onClick={() => inv.deleteSubItem(loc, subloc, value, subValue)} 
                                        />}
                                      </div>

                                    ))}
                                    <li>

                                      <div className='bttnsDiv'>
                                        <input maxLength={40} type="text" className='addInput' onChange={(e) => setValor(e.target.value)} />
                                        <MdLibraryAdd title='Adicionar endereço' className='addButton'
                                          tabIndex={0}  
                                          onClick={() => inv.addSubItem(loc, subloc, value, valor.toLowerCase())}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              inv.addSubItem(loc, subloc, value, valor.toLowerCase())
                                            }
                                          }} />
                                      </div>

                                    </li>
                                  </ul>
                                )}
                              </div>
                            ))}
                            <li>

                              <div className='bttnsDiv'>
                                <input maxLength={40} type="text" className='addInput' onChange={(e) => setValor(e.target.value)} />
                                <MdLibraryAdd title='Adicionar endereço' className='addButton' 
                                  tabIndex={0}
                                  onClick={() => inv.addSubVal(loc, subloc, valor.toLowerCase())}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      inv.addSubVal(loc, subloc, valor.toLowerCase())
                                    }
                                  }} />
                              </div>

                            </li>
                          </ul>
                        )}
                      </div>
                    ))}

                    <div className='bttnsDiv'>
                      <input maxLength={40} type="text" className='addInput' onChange={(e) => setValor(e.target.value)} />
                      <MdLibraryAdd title='Adicionar endereço' className='addButton' 
                        tabIndex={0}
                        onClick={() => inv.addSubInv(loc, valor.toLowerCase())}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            inv.addSubInv(loc, valor.toLowerCase())
                          }
                        }} />
                    </div>

                  </ul>
                )}
              </div>
            ))}
            <li>
              <div className='bttnsDiv'>
                <input maxLength={40} type="text" className='addInput' onChange={(e) => setValor(e.target.value)} autoFocus={true} />
                <MdLibraryAdd title='Adicionar endereço' className='addButton' 
                  tabIndex={0}
                  onClick={() => inv.addInv(valor.toLowerCase())}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      inv.addInv(valor.toLowerCase())
                    }
                  }} />
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}

export default Inventory;
