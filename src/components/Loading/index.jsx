import { CircularProgress } from '@material-ui/core';

const Loading = () => (
  <div
    style={{
      height: '100%',
      minHeight: '160px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </div>
);

export default Loading;
