import { Box, Heading } from '@chakra-ui/react'

import { InlineMath } from 'react-katex'
import { Polynomial } from '../modules/polynomials'
import { Latex } from '../components/Latex'

const f = new Polynomial.Polynomial([4, 2, 1])
const g = new Polynomial.Polynomial([5, 2, -1])
const fPlusg = f.add(g)

const points: [number, number][] = [
  [1, 1],
  [2, 4],
  [7, 9],
]

const PolynomialsPage: React.FC = () => {
  return (
    <>
      <Heading as="h1" size="md">
        Polynomials
      </Heading>
      <Box as="section" my="10">
        <Heading as="h2" size="sm" mb="1">
          Theorem
        </Heading>

        <Latex>{Polynomial.Theorem.definition}</Latex>
        <p>
          <Latex>{Polynomial.Theorem.formula}</Latex>
        </p>
      </Box>
      <Box as="section" my="10">
        <Heading as="h2" size="sm" mb="1">
          Polynomial class
        </Heading>
        <InlineMath>{`f(x)=${f.latexDisplay}`}</InlineMath>
        <div>
          <Latex>{`f(-2)=${f.evalAt(-2)}`}</Latex>
        </div>
        <InlineMath>{`g(x)=${g.latexDisplay}`}</InlineMath>
        <div>
          <Latex>{`g(-2)=${g.evalAt(-2)}`}</Latex>
        </div>
        <InlineMath>{`(f+g)(x)=${fPlusg.latexDisplay}`}</InlineMath>
        <div>
          <Latex>{`(f+g)(-2)=${fPlusg.evalAt(-2)}`}</Latex>
        </div>
      </Box>
      <Box as="section" my="10">
        <Heading as="h2" size="sm" mb="1">
          Interpolation from points
        </Heading>
        <div>
          Points list :{' '}
          <InlineMath>{points.map(point => `(${point[0]},${point[1]})`).join(', ')}</InlineMath>
        </div>
        <div> Interpolation :</div>
        <InlineMath>{Polynomial.interpolate(points).latexDisplay}</InlineMath>
      </Box>
    </>
  )
}

export { PolynomialsPage }
