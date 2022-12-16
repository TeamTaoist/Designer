import styled from "styled-components";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoaderBox = styled.div`
  .la-ball-grid-pulse,
  .la-ball-grid-pulse > div {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .la-ball-grid-pulse {
    display: block;
    font-size: 0;
    color: #0455cc;
  }
  .la-ball-grid-pulse.la-dark {
    color: #333;
  }
  .la-ball-grid-pulse > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }
  .la-ball-grid-pulse {
    width: 36px;
    height: 36px;
  }
  .la-ball-grid-pulse > div {
    width: 8px;
    height: 8px;
    margin: 2px;
    border-radius: 100%;
    -webkit-animation-name: ball-grid-pulse;
    -moz-animation-name: ball-grid-pulse;
    -o-animation-name: ball-grid-pulse;
    animation-name: ball-grid-pulse;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .la-ball-grid-pulse > div:nth-child(1) {
    -webkit-animation-duration: .65s;
    -moz-animation-duration: .65s;
    -o-animation-duration: .65s;
    animation-duration: .65s;
    -webkit-animation-delay: .03s;
    -moz-animation-delay: .03s;
    -o-animation-delay: .03s;
    animation-delay: .03s;
  }
  .la-ball-grid-pulse > div:nth-child(2) {
    -webkit-animation-duration: 1.02s;
    -moz-animation-duration: 1.02s;
    -o-animation-duration: 1.02s;
    animation-duration: 1.02s;
    -webkit-animation-delay: .09s;
    -moz-animation-delay: .09s;
    -o-animation-delay: .09s;
    animation-delay: .09s;
  }
  .la-ball-grid-pulse > div:nth-child(3) {
    -webkit-animation-duration: 1.06s;
    -moz-animation-duration: 1.06s;
    -o-animation-duration: 1.06s;
    animation-duration: 1.06s;
    -webkit-animation-delay: -.69s;
    -moz-animation-delay: -.69s;
    -o-animation-delay: -.69s;
    animation-delay: -.69s;
  }
  .la-ball-grid-pulse > div:nth-child(4) {
    -webkit-animation-duration: 1.5s;
    -moz-animation-duration: 1.5s;
    -o-animation-duration: 1.5s;
    animation-duration: 1.5s;
    -webkit-animation-delay: -.41s;
    -moz-animation-delay: -.41s;
    -o-animation-delay: -.41s;
    animation-delay: -.41s;
  }
  .la-ball-grid-pulse > div:nth-child(5) {
    -webkit-animation-duration: 1.6s;
    -moz-animation-duration: 1.6s;
    -o-animation-duration: 1.6s;
    animation-duration: 1.6s;
    -webkit-animation-delay: .04s;
    -moz-animation-delay: .04s;
    -o-animation-delay: .04s;
    animation-delay: .04s;
  }
  .la-ball-grid-pulse > div:nth-child(6) {
    -webkit-animation-duration: .84s;
    -moz-animation-duration: .84s;
    -o-animation-duration: .84s;
    animation-duration: .84s;
    -webkit-animation-delay: .07s;
    -moz-animation-delay: .07s;
    -o-animation-delay: .07s;
    animation-delay: .07s;
  }
  .la-ball-grid-pulse > div:nth-child(7) {
    -webkit-animation-duration: .68s;
    -moz-animation-duration: .68s;
    -o-animation-duration: .68s;
    animation-duration: .68s;
    -webkit-animation-delay: -.66s;
    -moz-animation-delay: -.66s;
    -o-animation-delay: -.66s;
    animation-delay: -.66s;
  }
  .la-ball-grid-pulse > div:nth-child(8) {
    -webkit-animation-duration: .93s;
    -moz-animation-duration: .93s;
    -o-animation-duration: .93s;
    animation-duration: .93s;
    -webkit-animation-delay: -.76s;
    -moz-animation-delay: -.76s;
    -o-animation-delay: -.76s;
    animation-delay: -.76s;
  }
  .la-ball-grid-pulse > div:nth-child(9) {
    -webkit-animation-duration: 1.24s;
    -moz-animation-duration: 1.24s;
    -o-animation-duration: 1.24s;
    animation-duration: 1.24s;
    -webkit-animation-delay: -.76s;
    -moz-animation-delay: -.76s;
    -o-animation-delay: -.76s;
    animation-delay: -.76s;
  }
  .la-ball-grid-pulse.la-sm {
    width: 18px;
    height: 18px;
  }
  .la-ball-grid-pulse.la-sm > div {
    width: 4px;
    height: 4px;
    margin: 1px;
  }
  .la-ball-grid-pulse.la-2x {
    width: 72px;
    height: 72px;
  }
  .la-ball-grid-pulse.la-2x > div {
    width: 16px;
    height: 16px;
    margin: 4px;
  }
  .la-ball-grid-pulse.la-3x {
    width: 108px;
    height: 108px;
  }
  .la-ball-grid-pulse.la-3x > div {
    width: 24px;
    height: 24px;
    margin: 6px;
  }
  /*
   * Animation
   */
  @-webkit-keyframes ball-grid-pulse {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      opacity: .35;
      -webkit-transform: scale(.45);
      transform: scale(.45);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @-moz-keyframes ball-grid-pulse {
    0% {
      opacity: 1;
      -moz-transform: scale(1);
      transform: scale(1);
    }
    50% {
      opacity: .35;
      -moz-transform: scale(.45);
      transform: scale(.45);
    }
    100% {
      opacity: 1;
      -moz-transform: scale(1);
      transform: scale(1);
    }
  }
  @-o-keyframes ball-grid-pulse {
    0% {
      opacity: 1;
      -o-transform: scale(1);
      transform: scale(1);
    }
    50% {
      opacity: .35;
      -o-transform: scale(.45);
      transform: scale(.45);
    }
    100% {
      opacity: 1;
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes ball-grid-pulse {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    50% {
      opacity: .35;
      -webkit-transform: scale(.45);
      -moz-transform: scale(.45);
      -o-transform: scale(.45);
      transform: scale(.45);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
`
function ApiLoader() {
  return <Box>
    <LoaderBox>
      <div className="la-ball-grid-pulse la-3x">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoaderBox>
      {/*Initializing API*/}
  </Box>;
}

export { ApiLoader };
