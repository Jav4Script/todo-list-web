import { Button as ShadButton } from '@/components/ui/button'

import styled from 'styled-components'

interface ButtonProps {
  label: string
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <StyledShadButton onClick={onClick}>{label}</StyledShadButton>
)

const StyledShadButton = styled(ShadButton)`
  color: red;
  margin: 8px 8px;
`

export default Button
