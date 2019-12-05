import * as React from 'react'
import styled from '@emotion/styled'

const BackgroundContainer = styled.picture<{
  backgroundHasLoaded: boolean
}>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: opacity 1s;
  ${(props) => `opacity: ${props.backgroundHasLoaded ? 1 : 0}`};
`

const Background = styled.img`
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
  object-fit: cover;
`

export const EmbarkBackground: React.FC = () => {
  const [backgroundHasLoaded, setBackgroundHasLoaded] = React.useState(false)
  const [imgSrc, setImgSrc] = React.useState<{
    src: null | string
    srcSet: null | string
  }>({
    src: null,
    srcSet: null,
  })

  React.useEffect(() => {
    setImgSrc({
      src:
        '/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1400.jpg',
      srcSet: `/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_200.jpg 200w,
            /new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_481.jpg 481w,
            /new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_677.jpg 677w,
            /new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_858.jpg 858w,
            /new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1013.jpg 1013w,
            /new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1161.jpg 1161w,
            /new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1296.jpg 1296w,
            /new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1393.jpg 1393w,
            /new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1400.jpg 1400w`,
    })
  }, [])

  return (
    <BackgroundContainer backgroundHasLoaded={backgroundHasLoaded}>
      <Background
        onLoad={() => setBackgroundHasLoaded(true)}
        sizes="(max-width: 1400px) 100vw, 1400px"
        srcSet={imgSrc.srcSet || ''}
        src={imgSrc.src || ''}
      />
    </BackgroundContainer>
  )
}
