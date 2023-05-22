import { InlineMath } from 'react-katex'

type LatexProps = {
  children: string
}

const Latex: React.FC<LatexProps> = ({ children }) => {
  const symbolRegex = /\$\$(.*?)\$\$/g

  const content = children.split(symbolRegex).map((text, index) => {
    if (index % 2 === 0) {
      return text
    } else {
      return <InlineMath>{text}</InlineMath>
    }
  })

  return <>{content}</>
}

export { Latex }
