import { useState } from 'react';
import data from './data';
import './styles.css';
import { motion, AnimatePresence } from 'framer-motion';

function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMultiple);
  }

  return (
    <div className="acc-wrapper">
        <button
            onClick={() => {
                setEnableMultiSelection(!enableMultiSelection);
                setSelected(null);
                setMultiple([]);
            }}
            >
            Enable Multi Selection
        </button>
      <div className="accordian">
        {data && data.length > 0 ? (
            data.map((dataItem) => {
                const isOpen = enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1
                : selected === dataItem.id;

                return (
                <div className="item" key={dataItem.id}>
                    <div
                    onClick={
                        enableMultiSelection
                        ? () => handleMultiSelection(dataItem.id)
                        : () => handleSingleSelection(dataItem.id)
                    }
                    className="title"
                    >
                    <h3>{dataItem.question}</h3>
                    <span>{isOpen ? '-' : '+'}</span>
                    </div>

                    <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="acc-content"
                        >
                        {dataItem.answer}
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
                );
            })
        ) : (
        <div>No data found!</div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
