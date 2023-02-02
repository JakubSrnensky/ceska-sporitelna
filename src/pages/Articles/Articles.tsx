
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import Title from '../../components/Title/Title'
import Container from '../../components/Container/Container'
import Article from '../../components/Article/Article'
import Modal from '../../components/Modal/Modal'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'
import Form from '../../components/Form/Form'
import Fieldset from '../../components/Fieldset/Fieldset'
import { fetchData } from '../../hooks/fetchData'
import './Articles.scss'

type article = {
    _id: string
    author: string
    name: string
    published: number | null
    text: string
    update: number | null
}

type user = {
    _id: string
    user: string
}

export default function Articles() {

    const navigate = useNavigate();

    const [ modal, setModal ] = useState<boolean>(false)
    const [ articles, setArticles ] = useState<article[]>([])
    const [ article, setArticle ] = useState<any>()
    const [ user, setUser ] = useState<user>()
    const [ storage, setStorage ] = useState<boolean>(false)
    const [ refresh, setRefresh ] = useState<boolean>(false)

    const hadlerClickNavigate = () => {
        navigate("/login")
    }

    const handlerClickClose = () => {
        setModal(false)
        setArticle({})
    }

    const handlerClickEdit = (article: article) => {
        setModal(true)
        setArticle(article)
    }

    const handlerClickAdd = () => {
        setModal(true)
    }

    const formatDate = (event: number) => {
    
        if(!event) {
            return null
        }

        return new Date(event).toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric"})
    }

    const handlerClickSave = async (event: any) => {
        event.preventDefault();

        let id = null
        let updateDate = null

        if(article?.author){
            id = article._id
            updateDate = new Date().getTime()
        }

        let todayDate = null

        if(!article?.author){
            todayDate = new Date().getTime()
        }
        
        setRefresh(true)

        try {
            const response = await fetch('http://localhost:8080/', {
                method: article?.author ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    name: event.target.name.value,
                    published: article?.author ? article.published : todayDate,
                    updated: article?.author ? updateDate : null,
                    author: user?.user,
                    text: event.target.text.value
                })
            });
            await response.json();
        } catch(error) {
            console.log(error)
        } 
    
        setRefresh(false)
        setModal(false)
        setArticle({})
    }

    const hadlerClickLogout = () => {
        localStorage.removeItem('userCs');
        setStorage(true)
    }

    useEffect(() => {
        setUser(() => {
            const storage: any = localStorage.getItem('userCs')
            return JSON.parse(storage)
        })
    },[storage])


    useEffect(() => {
      
        const getArticles = async () => {
            setArticles(await fetchData('http://localhost:8080/'))
        };

        getArticles()
        
    },[refresh])
    
    return (
        <Container className="articles">
            
            {user ?
                <div className="articles-user">
                    Jste přihlášený jako {user?.user} |&nbsp; 
                    <Button onClick={hadlerClickLogout} className="articles-logout">Odhlásit se</Button>
                </div>
            :
                <Button onClick={hadlerClickNavigate} className="articles-user">Přihlásit se</Button>
            }

            <div className="articles-wrap">
                <Title as="h1">Články</Title>
                {user && <Button onClick={handlerClickAdd}>Přidat článek</Button>}
            </div>

            {articles?.length > 0 ? 
                <section className="articles-section">
                    {articles?.map((article: any, index: number) => 
                        <Article
                            key={index} 
                            name={article.name} 
                            published={formatDate(article.published)}
                            author={article.author}
                            text={article.text}
                            user={user}
                            onClick={() => handlerClickEdit(article)}
                        />
                    )}
                </section>
            : 
                <Loading />
            }

            {modal && 
                <Modal 
                    onClickClose={handlerClickClose} 
                >
                    <Form className='modal-container' onSubmit={handlerClickSave} >
                        
                        <Title as='h2' className='modal-title'>{article?.author ? "Upravit článek" : "Přidat článek"}</Title>
                        
                        <p className='modal-dates'>
                            { article?.published && <span>Publikováno: {formatDate(article?.published)}</span> }
                            { article?.updated && <span className='modal-dateEdit'>Editováno: {formatDate(article?.updated)}</span> }
                        </p>
                        
                        <Fieldset type="input" name="name" value={article?.name || null} placeholder="Zadejte název článku" />
                        <Fieldset type="textarea" name="text" value={article?.text || null} placeholder="Zadejte textaci" />
                        
                        <Button type="submit">Uložit</Button>
                    
                    </Form>           
                </Modal>
            }

        </Container> 
    )
}