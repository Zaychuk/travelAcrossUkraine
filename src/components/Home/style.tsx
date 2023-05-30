import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 65px);
  overflow: hidden;
`
export const Bg = styled.img`
  position: fixed;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`
export const Title = styled.h1`
  position: absolute;
  top: 10%;
  width: 100%;
  text-align: center;
  font-size: 56px;
  color: #ffffff;
  text-shadow: 4px 3px 0 #5a5a5a;
  `
  export const Description = styled.div`
  text-align: justify;
  padding: 50px 40px;
  border-radius: 20px;
  max-width: 800px;
  color: white;
  background-color: rgba(122, 122, 122, 0.6);
`
