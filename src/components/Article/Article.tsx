
import { MouseEventHandler } from 'react'
import Title from '../Title/Title'
import Button from '../Button/Button'
import './Article.scss'

type props = {
    name: string
    published: any
    author: string
    text: string
    user: user | undefined
    onClick: MouseEventHandler<HTMLButtonElement>
}

type user = {
    _id: string,
    user: string
}

export default function Article(props: props) {

    return (
        <article className="article">
            <Title as="h2" className="article-title">{props.name}</Title>
            <p className='article-dates'>
              <span>Publikováno: {props.published}</span>
            </p>
            <p className="article-text">
                {props.text}
            </p>
            
            {props?.author === props?.user?.user &&
                <Button onClick={props.onClick}>Upravit</Button>
            }
        </article>
    )
}