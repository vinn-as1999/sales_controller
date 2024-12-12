import React, { useContext, useState, useRef, useEffect } from 'react'
import { ProductsContext } from '../components/contexts/ProductsContext'
import Empty from '../components/messages/Empty'
import { BiSolidTrash } from "react-icons/bi"
import { GiNothingToSay } from 'react-icons/gi'
import { MdClose } from "react-icons/md"
import '../../styles/Shopping.css'
import { SalesContext } from '../components/contexts/SalesContext'
import { ClientsContext } from '../components/contexts/ClientsContext'

function Shopping() {
    const prodUrl = import.meta.env.VITE_PRODUCTS_URL;
    const clientsUrl = import.meta.env.VITE_ADD_CLIENTS_URL;
    const fixedId = import.meta.env.VITE_FIXED_ID;
    const fixedUser = import.meta.env.VITE_FIXED_USERNAME;

    const {products, getProducts} = useContext(ProductsContext);
    const {sales, registerSales, registerPayment} = useContext(SalesContext);
    const {clientsList, setClientsList} = useContext(ClientsContext)
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productCount, setProductCount] = useState({}); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dialogRef = useRef(null);

    // inputs states
    const clientObj = JSON.parse(localStorage.getItem('client')) || {};
    const [name, setName] = useState(() => clientObj.client ? JSON.parse(clientObj.client) : '');
    const [phone, setPhone] = useState(() => clientObj.contact ? JSON.parse(clientObj.contact) : null);
    const [address, setAddress] = useState(() => clientObj.address ? JSON.parse(clientObj.address) : '');
    const [isPaid, setIsPaid] = useState(false);

    function openModal() {
        dialogRef.current.showModal();
        setIsModalOpen(true);
    };
    
    function closeModal() {
        dialogRef.current.close();
        setIsModalOpen(false);
    };
    
    function toggleCategory(category) {
        setExpandedCategories(function (prev) {
            return prev.includes(category)
                ? prev.filter(function (cat) { return cat !== category; })
                : [...prev, category];
        });
    };
    
    function handleProductClick(productName) {
        setSelectedProduct(function (prev) {
            return [...prev, productName];
        });
    };
    
    function handleProductRemove(productName) {
        setSelectedProduct(function (prev) {
            return prev.filter(function (item) { return item !== productName; });
        });
    };

    async function addClients() {
        if (!name.trim || !phone.trim() || !address.trim()) {
          console.log('deu n')
          return
        }
    
        try {
          const response = await fetch(clientsUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: fixedId,
              client: name,
              contact: phone,
              address: address,
              observations: ''
            })
          });
          
          if (!response.ok) {
            console.log('Erro ao adicionar cliente: ', response);
            return
          }
      
          const data = await response.json();
      
          if (data[0].error) {
            console.log(data[0].error);
            return
          }
      
          const newClients = {
            client: data[0].client.client,
            contact: data[0].client.contact,
            address: data[0].client.address,
            observations: data[0].client.observations
          }
    
          setClientsList(prev => [...prev, newClients]);
          localStorage.setItem('client', JSON.stringify(newClients));
          console.log('sucesso, cliente adicionado: ', data);
    
        } catch (error) {
          console.log('Erro ocorrido: ', error)
        }
      };

    async function register(event) {
        event.preventDefault();

        if (!localStorage.getItem('client')) await addClients();
        
        const status = isPaid ? 'paid' : 'pending';

        for (let item in productCount) {
            const itemQty = productCount[item];
            await registerSales(event, fixedId, fixedUser, name, item, itemQty, status);
        }

        console.log('Dados enviados');
    };


    useEffect(() => {
        console.log(productCount)
    }, [productCount]);
    

    // Atualiza o contador sempre que selectedProduct mudar
    useEffect(() => {
        const count = selectedProduct.reduce((acc, product) => {
            acc[product] = (acc[product] || 0) + 1; // Incrementa a quantidade do produto
            return acc;
        }, {});
        setProductCount(count); // Atualiza o estado de contagem
    }, [selectedProduct]);

    useEffect(() => {
        console.log('chamou produtos');
        getProducts(`${prodUrl}/${fixedId}`);

        return () => {}
    }, [sales]);

    return (
        <>
            <main className='shoppingMain'>
                {isModalOpen && <div className='modalBackdrop' onClick={() => closeModal()}></div>}
                <dialog ref={dialogRef} className='regModal'>
                    <div style={{width: '60vw', textAlign: 'end'}}>
                        <MdClose onClick={() => closeModal()} className='modalClose' />
                    </div>
                    <form className='cliUserForm' onSubmit={(e) => register(e)}>
                        <label>Seu nome:</label>
                        <input type="text" placeholder='ex: João' value={name} onChange={(e) => setName(e.target.value)} />

                        <label>Telefone:</label>
                        <input type="number" placeholder='ex: 19999999' value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <label>Local:</label>
                        <input type="text" placeholder='ex: Eaton' value={address} onChange={(e) => setAddress(e.target.value)} />

                        <button type='submit'>Registrar</button>
                    </form>
                </dialog>

                <section className='store'>
                    <header>
                        <h2>O QUE VAI LEVAR HOJE?</h2>
                    </header>
                    <article>
                        {products.length > 0 
                            ? products.map((cat) => (
                                <div key={cat.category}>
                                    <h3 onClick={() => toggleCategory(cat.category)} 
                                        className="categoryTitle">
                                        {cat.category}
                                    </h3>
                                    {expandedCategories.includes(cat.category) && (
                                        <ul>
                                            {cat.products.map((prod, index) => (
                                                <li key={index}
                                                    onClick={() => handleProductClick(prod.name)}>
                                                    <div className={selectedProduct.includes(prod.name) ? 'selected' : 'prodDiv'}>
                                                        <div className='prodName'>
                                                            <p>{prod.name}</p>
                                                            <p className='quantity'>Estoque: {prod.quantity}</p>
                                                        </div>
                                                        {selectedProduct.includes(prod.name) && (
                                                            <BiSolidTrash className='removeProd'
                                                                onClick={(e) => {handleProductRemove(prod.name); e.stopPropagation()}} />
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )) 
                            : <div className='noProd'>
                                Nada em estoque
                            </div>}
                    </article>
                </section>

                <section className='shop'>
                    <header>
                        <h2>SUAS COMPRAS</h2>
                    </header>
                    <article>
                        <div className='prodList'>
                            {Object.keys(productCount).length > 0 
                                ? Object.keys(productCount).map((productName) => (
                                    <div key={productName} className='shopProds'>
                                        {productName}
                                        <p>Quantidade: {productCount[productName]}</p>
                                    </div>
                                )) 
                                : (<div className='noProd'>Nenhum produto aqui</div>)}
                        </div>

                        <div>
                            <label>Já pagou? Clique aqui:</label>
                            <input className='payment-input' title='Clique caso já tenha pago' type="checkbox" checked={isPaid} onChange={() => setIsPaid(prev => !prev)} />
                        </div>  

                        <button onClick={(e) => {
                            Object.keys(clientObj).length === 0 ? openModal() : register(e)
                        }}>Finalizar</button>
                    </article>
                </section>
            </main>
        </>
    );
}

export default Shopping;
