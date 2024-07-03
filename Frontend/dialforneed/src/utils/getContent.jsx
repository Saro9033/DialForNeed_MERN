// src/utils/contentUtils.js

export const renderContent = (status, data, error, renderSuccess) => {
  switch (status) {
      case 'loading':
          return <div className="d-flex align-items-start justify-content-center"><div className="loader"></div> </div>
      case 'failed':
          return <p>Error: {error}</p>;
      case 'succeeded':
          return renderSuccess(data);
      default:
          return null;
  }
};
