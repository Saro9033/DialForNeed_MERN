import React, { createContext, useEffect, useState } from 'react';

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarClose = () => setShowSidebar(false);
  const handleSidebarShow = () => setShowSidebar(true);

  const [price, setPrice] = useState([0, 50000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedRatings, setSelectedRatings] = useState(null);

  useEffect(() => {
    setPriceChanged(price);
  }, [price]);

  const [keywordQuery, setKeywordQuery] = useState('');
  const [selectedType, setSelectedType,] = useState(null);


  //Razorpay
  const [rzpKey,setRzpKey]=useState('')
  
  return (
    <SidebarContext.Provider value={{
      selectedRatings, setSelectedRatings,
      selectedType, setSelectedType,
      keywordQuery, setKeywordQuery,
      selectedBrandId, setSelectedBrandId,
      price, setPrice, priceChanged,
      setPriceChanged, selectedCategoryId,
      setSelectedCategoryId, showSidebar,
      handleSidebarClose, handleSidebarShow,

      rzpKey,setRzpKey
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
