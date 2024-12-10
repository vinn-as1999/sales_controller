import React, { useContext, useState, useRef, useEffect } from 'react';
import { ProductsContext } from '../components/contexts/ProductsContext';
import { BiSolidTrash } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import '../../styles/Shopping.css';

function Shopping() {
    const { products, deleteProduct } = useContext(ProductsContext);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]); // Produtos selecionados
    const [productCount, setProductCount] = useState({}); // Contagem de produtos selecionados
    const dialogRef = useRef(null);

    // Alterna a visibilidade das categorias
    const toggleCategory = (category) => {
        setExpandedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    // Função para lidar com a seleção de produtos
    const handleProductClick = (productName) => {
        setSelectedProduct((prev) => [...prev, productName]); // Adiciona o produto à seleção
    };

    // Função para lidar com a remoção de um produto
    const handleProductRemove = (productName) => {
        setSelectedProduct((prev) => prev.filter(item => item !== productName)); // Remove o produto da seleção
    };

    // Atualiza o contador sempre que selectedProduct mudar
    useEffect(() => {
        const count = selectedProduct.reduce((acc, product) => {
            acc[product] = (acc[product] || 0) + 1; // Incrementa a quantidade do produto
            return acc;
        }, {});
        setProductCount(count); // Atualiza o estado de contagem
    }, [selectedProduct]);

    return (
        <>
            <main className='shoppingMain'>
                <dialog ref={dialogRef} className='regModal'>
                    <MdClose onClick={() => dialogRef.current.close()} className='modalClose' />
                    <form className='cliUserForm' onSubmit={() => register()}>
                        <label>Seu nome:</label>
                        <input type="text" placeholder='ex: João' />

                        <label>Telefone:</label>
                        <input type="number" placeholder='ex: 19999999' />

                        <label>Local:</label>
                        <input type="text" placeholder='ex: Eaton' />

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
                            : 'não'}
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
                                        <p> - Quantidade: {productCount[productName]}</p>
                                    </div>
                                )) 
                                : (<div className='noProd'>Nenhum produto aqui</div>)}
                        </div>

                        <div>
                            <label>Já pagou? Clique aqui:</label>
                            <input className='payment-input' title='Clique caso já tenha pago' type="checkbox" />
                        </div>  

                        <button onClick={() => dialogRef.current.showModal()}>Finalizar</button>
                    </article>
                </section>
            </main>
        </>
    );
}

export default Shopping;
