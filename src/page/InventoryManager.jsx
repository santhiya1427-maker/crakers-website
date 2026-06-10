import React, { useState } from 'react';
import oneSortCrackers from '../assets/one sound crackers.jpeg'
import chorsaCrackers from '../assets/chorsa crackers.jpeg'
const generateBarcodeBars = (text) => {
  if (!text) return [];
  const code128Alphabet = {
    '0': '212222', '1': '222122', '2': '222221', '3': '121223',
    '4': '121322', '5': '131222', '6': '122213', '7': '122312',
    '8': '132212', '9': '221213', ' ': '211232', 'P': '121133',
    'R': '112312', 'E': '112232', 'V': '131123', 'I': '123112', 'W': '131311'
  };

  const cleanText = text.toUpperCase().replace(/[^0-9PREVIEW ]/g, '');
  if (!cleanText) return [];

  
  let patternSequence = '110110103'; 
  for (let char of cleanText) {
    const barWeight = code128Alphabet[char] || '211232';
    patternSequence += barWeight;
  }
  patternSequence += '2331112';
  const structuralBars = [];
  let isBlackBar = true;

  for (let digit of patternSequence) {
    const widthCount = parseInt(digit, 10);
    for (let i = 0; i < widthCount; i++) {
      structuralBars.push(isBlackBar);
    }
  }

  return structuralBars;
};

const InventoryManager = () => {
  const [inventoryList, setInventoryList] = useState([
    { id: "1", name: "One Sound Crackers", price: "150", qty: "50", category: "Sound Crackers", barcode: "12345678", image: oneSortCrackers },
    { id: "2", name: "Chorsa Garlands 28 Chorsa", price: "450", qty: "20", category: "Garlands", barcode: "87654321", image:  chorsaCrackers }
  ]);
  const [newItem, setNewItem] = useState({
    itemNo: '', itemName: '', price: '', quantity: '', category: '', barcode: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleBarcodeGeneration = (e) => {
    e.preventDefault();
    const randomBarcode = Math.floor(10000000 + Math.random() * 90000000).toString();
    setNewItem({ ...newItem, barcode: randomBarcode });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.itemNo || !newItem.itemName) {
      alert("Please enter Item Number and Item Name!");
      return;
    }

    const finalBarcode = newItem.barcode.trim() || newItem.itemNo.trim() || "00000000";

    const productData = {
      id: newItem.itemNo,
      name: newItem.itemName,
      price: newItem.price || '0',
      qty: newItem.quantity || '0',
      category: newItem.category || 'General',
      barcode: finalBarcode,
      image: selectedImage
    };

    setInventoryList([...inventoryList, productData]);
    setNewItem({ itemNo: '', itemName: '', price: '', quantity: '', category: '', barcode: '' });
    setSelectedImage(null);
  };

  return (
    <div className="inventory-container">
      <h2>📦 Sparow Mart Dashboard</h2>
      <div className="inventory-form-wrapper">
        <h3 className="brand-title">Sparow mart</h3>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            <div className="form-group">
              <label>Item No</label>
              <input type="text" placeholder="Item No" value={newItem.itemNo} onChange={(e) => setNewItem({...newItem, itemNo: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Item Name</label>
              <input type="text" placeholder="Item Name" value={newItem.itemName} onChange={(e) => setNewItem({...newItem, itemName: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input type="number" placeholder="0" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem({...newItem, quantity: e.target.value})} />
            </div>

            <div className="form-group full-width">
              <label>Barcode</label>
              <input 
                type="text" 
                placeholder="Barcode (Type custom ID or click 'Generate Barcode' below)" 
                value={newItem.barcode} 
                onChange={(e) => setNewItem({...newItem, barcode: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Select Category</label>
              <select value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})}>
                <option value="">Select Category</option>
                <option value="Sound Crackers">Sound Crackers</option>
                <option value="Sparklers">Sparklers</option>
                <option value="Flower Pots">Flower Pots</option>
                <option value="Chakra">Ground Chakras</option>
              </select>
            </div>

            <div className="form-group">
              <label>Upload Image</label>
              <input type="file" accept="image/*" className="file-input" onChange={handleImageChange} />
            </div>
          </div>

          <button className="btn-action btn-generate" onClick={handleBarcodeGeneration}>
            Generate Barcode
          </button>

          <button className="btn-action btn-add-item" onClick={handleAddItem}>
            Add Item
          </button>
        </form>
      </div>

      <hr className="section-divider" />
      <div className="inventory-card">
        <div className="table-header-area">
          <input type="search" placeholder="Search item inside stock..." className="table-search" />
        </div>

        <div className="table-responsive">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>ITEM.NO</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>BARCODE</th>
                <th>EDIT</th>
                <th>DEL</th>
              </tr>
            </thead>
            <tbody>
              {inventoryList.map((item) => (
                <tr key={item.id}>
                  <td className="txt-bold">{item.id}</td>
                  <td>
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="table-img-preview" />
                    ) : (
                      <div className="table-no-img"></div>
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td className={`txt-bold ${item.qty < 10 ? 'stock-low' : 'stock-ok'}`}>{item.qty} pcs</td>
                  <td>
                    <div className="custom-engine-barcode-wrapper">
                      <div className="bars-flex-container">
                        {generateBarcodeBars(item.barcode).map((isBlack, index) => (
                          <div
                            key={index}
                            className="barcode-single-pixel-line"
                            style={{
                              backgroundColor: isBlack ? '#000000' : 'transparent'
                            }}
                          />
                        ))}
                      </div>
                      <div className="barcode-under-label">{item.barcode}</div>
                    </div>
                  </td>
                  <td><button className="btn-table-edit" onClick={() => alert('Edit properties')}>📝</button></td>
                  <td><button className="btn-table-del" onClick={() => setInventoryList(inventoryList.filter(i => i.id !== item.id))}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default InventoryManager;