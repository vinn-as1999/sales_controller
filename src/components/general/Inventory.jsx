import React, { useEffect, useState } from 'react'
import { MdLibraryAdd } from "react-icons/md"
import { IoIosCloseCircle } from "react-icons/io"
import WarehouseForm from '../forms/WarehouseForm.jsx'
import '../../styles/Inventory.css'

function Inventory() {
  const [visibleIndex, setVisibleIndex] = useState({});
  const [visibleSubIndex, setVisibleSubIndex] = useState({});
  const [visibleSubValue, setVisibleSubValue] = useState({});
  const [valor, setValor] = useState();
  
  // Exemplo de estrutura de list atualizada para suportar subinventários nos itens
  const [list, setList] = useState({
    alimentos: {
      frutas: {
        banana: ['banana.01', 'banana.02'],
        morango: ['morango.01', 'morango.02'],
        uva: []
      }
    },
    doces: {
      chocolates: {
        alpino: ['alpino.01', 'alpino.02'],
        sufle: ['sufle.01', 'sufle.02'],
        garoto: []
      }
    }
  });

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

        setList((prev) => {
          const myList = {...prev}
          delete myList[loc]

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

  useEffect(() => {}, [list]);

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
                    <li onClick={() => editWH(index)}>{loc.toUpperCase()}</li>
                    {loc && <IoIosCloseCircle title='Remover endereço' className='xButton' onClick={() => inv.deleteInv(loc)} />}
                  </div>
                </div>
                {visibleIndex[index] && ( // Mantém o inventário aberto
                  <ul>
                    {Object.entries(list[loc]).map(([subloc, values]) => (
                      <div key={subloc}>

                        <div className='subInvDiv'>
                          <div className="bttnsDiv">
                            <li onClick={() => editSubWH(subloc)}>{subloc.toUpperCase()}</li>
                            {subloc && <IoIosCloseCircle title='Remover endereço' className='xButton' onClick={() => inv.deleteSubInv(loc, subloc)} />}
                          </div>
                        </div>

                        {visibleSubIndex[subloc] && ( // Mantém os subinventários abertos
                          <ul>
                            {Object.entries(values).map(([value, subValues], idx) => (
                              <div key={value}>
                                <div className='bttnsDiv'>
                                  <li onClick={() => editSubValue(value)}>{value.toUpperCase()}</li>
                                  {value && <IoIosCloseCircle title='Remover endereço' className='xButton' onClick={() => inv.deleteSubVal(loc, subloc, value)} />}
                                </div>
                                {visibleSubValue[value] && ( // Exibe os subitens
                                  <ul>
                                    {subValues.map((subValue, subIdx) => (

                                      <div className='bttnsDiv'>
                                        <li key={subIdx}>{subValue}</li>
                                        {subValue && <IoIosCloseCircle title='Remover endereço' className='xButton'
                                          onClick={() => inv.deleteSubItem(loc, subloc, value, subValue)} 
                                        />}
                                      </div>

                                    ))}
                                    <li>

                                      <div className='bttnsDiv'>
                                        <input type="text" className='addInput' onChange={(e) => setValor(e.target.value)} />
                                        <MdLibraryAdd title='Adicionar endereço' className='addButton' onClick={() => inv.addSubItem(loc, subloc, value, valor)} />
                                      </div>

                                    </li>
                                  </ul>
                                )}
                              </div>
                            ))}
                            <li>

                              <div className='bttnsDiv'>
                                <input type="text" className='addInput' onChange={(e) => setValor(e.target.value)} />
                                <MdLibraryAdd title='Adicionar endereço' className='addButton' onClick={() => inv.addSubVal(loc, subloc, valor)} />
                              </div>

                            </li>
                          </ul>
                        )}
                      </div>
                    ))}

                    <div className='bttnsDiv'>
                      <input type="text" className='addInput' onChange={(e) => setValor(e.target.value)} />
                      <MdLibraryAdd title='Adicionar endereço' className='addButton' onClick={() => inv.addSubInv(loc, valor)} />
                    </div>

                  </ul>
                )}
              </div>
            ))}
            <li>
              <div className='bttnsDiv'>
                <input type="text" className='addInput' onChange={(e) => setValor(e.target.value)} autoFocus={true} />
                <MdLibraryAdd title='Adicionar endereço' className='addButton' onClick={() => inv.addInv(valor)} />
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}

export default Inventory;
