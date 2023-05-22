export module Polynomial {
  export class Polynomial {
    private _degree: number

    constructor(private coefficients: number[]) {
      this._degree = coefficients.length - 1
    }

    get coefficient(): number[] {
      return this.coefficients
    }

    get degree(): number {
      return this._degree
    }

    //TODO: implement with Horner's method
    evalAt = (x: number) => {
      let result = 0
      for (let i = this.degree; i >= 0; i--) {
        result += this.coefficient[i] * Math.pow(x, i)
      }
      return result
    }

    add = (other: Polynomial): Polynomial => {
      const result = []
      const maxDegree = Math.max(this.degree, other.degree)
      for (let i = 0; i <= maxDegree; i++) {
        result.push((this.coefficient[i] || 0) + (other.coefficient[i] || 0))
      }
      return new Polynomial(result)
    }

    multiply = (other: Polynomial): Polynomial => {
      const result = Array(this.degree + other.degree + 1).fill(0)

      for (let i = 0; i <= this.degree; i++) {
        for (let j = 0; j <= other.degree; j++) {
          result[i + j] += this.coefficient[i] * other.coefficient[j]
        }
      }
      return new Polynomial(result)
    }

    get latexDisplay(): string {
      let result = ``
      for (let i = this.degree; i >= 0; i--) {
        if (this.coefficient[i] === 0) continue
        let displayCoefficient = new Intl.NumberFormat('fr-FR', {
          maximumSignificantDigits: 3,
          signDisplay: 'exceptZero',
        }).format(this.coefficient[i])

        const coeffNumber = Number(displayCoefficient)
        if (Math.abs(coeffNumber) === 1 && i !== 0) displayCoefficient = coeffNumber < 0 ? '-' : ''

        if (i === 0) {
          result += displayCoefficient
        } else if (i === 1) {
          result += `${displayCoefficient}x`
        } else {
          result += `${displayCoefficient}x^{${i}}`
        }
      }
      return result.charAt(0) === '+' ? result.slice(1) : result
    }
  }

  export const Theorem = {
    definition: `For any integer $$ n \\geq 0 $$ and any list of $$ n + 1 $$ points 
$$ (x_{1}; y_{1}) $$; $$(x_{2}; y_{2}) ; \\dots ; (x_{n+1}; y_{n+1})$$ in $$ \\Reals ^{2}$$ with $$x_{1} < x_{2} < ... < x_{n+1}$$, there exists a
unique polynomial $$p(x)$$ of degree at most $$n$$ such that $$p(x_{i}) = y_{i}$$ for all $$i$$.`,
    formula: `$$ f(x) = \\displaystyle\\sum_{i=1}^{n+1}y_{i} \\Bigg\\lparen \\displaystyle\\prod_{j \\ne i} \\frac{x-x_{j}}{x_{i}-x_{j}} \\Bigg\\rparen $$`,
  }

  export const ZERO = new Polynomial([])

  export const interpolate = (points: [number, number][]): Polynomial => {
    if (points.length === 0) throw new Error('Cannot interpolate with 0 points')

    const x_values = points.map(point => point[0])
    if (new Set(x_values).size !== x_values.length)
      throw new Error('Cannot interpolate with duplicate x values')

    const terms = points.map((_, i) => singleTerm(points, i))
    return terms.reduce((acc, term) => acc.add(term), ZERO)
  }

  const singleTerm = (points: [number, number][], i: number): Polynomial => {
    const [xi, yi] = points[i]

    const term = points
      .filter((_, j) => j !== i)
      .reduce(
        (acc, [xj, _]) => acc.multiply(new Polynomial([-xj / (xi - xj), 1.0 / (xi - xj)])),
        new Polynomial([1])
      )

    return term.multiply(new Polynomial([yi]))
  }
}
