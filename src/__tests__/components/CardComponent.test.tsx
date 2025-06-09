import { CardComponent } from '@/components'
import { render } from '@testing-library/react'
import type { Theme } from '@/types'
import { ThemeProvider } from 'styled-components'
import { themeList } from '@/resources/themesList'

describe('CardComponent', () => {
  const renderComponent = (theme: Theme, className?: string) =>
    render(
      <ThemeProvider theme={theme}>
        <CardComponent className={className} />
      </ThemeProvider>
    )

  themeList.forEach(({ name, theme }) => {
    describe(`${name}`, () => {
      it('should match the snapshot without any class', () => {
        const { asFragment } = renderComponent(theme)
        expect(asFragment()).toMatchSnapshot()
      })

      it('should match the snapshot with alert class', () => {
        const { asFragment } = renderComponent(theme, 'alert')
        expect(asFragment()).toMatchSnapshot()
      })

      it('should match the snapshot with success class', () => {
        const { asFragment } = renderComponent(theme, 'success')
        expect(asFragment()).toMatchSnapshot()
      })

      it('should match the snapshot with warning class', () => {
        const { asFragment } = renderComponent(theme, 'warning')
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})
