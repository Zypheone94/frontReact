import React, {useEffect, useState, useRef} from 'react';

function Selector({
                      selectorList,
                      isSearch,
                      value,
                      setValue,
                      defaultValue,
                      placeHolder,
                      width,
                      openHeight,
                      multiple,
                      disable
                  }) {


    const [isOpen, setIsOpen] = useState(false);
    const [searchContent, setSearchContent] = useState('');
    const [selectedValue, setSelectedValue] = useState(defaultValue ? defaultValue : '');

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        if (selectedValue !== '') setIsOpen(false);
    }, [selectedValue]);

    useEffect(() => {
        if (searchContent !== '') {
            setSelectedValue(searchContent);
            if (!isOpen) {
                setSearchContent('');
            } else if (!isOpen && !isSearch) {
                setValue(selectedValue);
            }
        }
        setSearchContent('')
    }, [isOpen]);

    const onSearch = e => {
        setSearchContent(e.target.value);
    };

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const setter = (data) => {
        setIsOpen(!isOpen)
        if (multiple) {

            const updatedValue = [...value]; // Crée une copie du tableau value

            if (updatedValue.includes(data)) {
                const index = updatedValue.indexOf(data);
                updatedValue.splice(index, 1);
            } else {
                updatedValue.push(data);
            }
            setValue(updatedValue)
            setSearchContent('');

        } else {
            setSelectedValue(data);
            setValue(data);
            setSearchContent(data);
        }
    }

    return (
        <div
            onClick={disable ? null : () => setIsOpen(!isOpen)}
            ref={wrapperRef}
            style={{
                borderColor: isOpen && 'black',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                zIndex: isOpen ? 12 : 10,
                cursor: disable ? 'not-allowed' : 'pointer',
                background: 'white',
                position: isOpen ? 'absolute' : 'relative',
                width: width ? width : '185px',
                minHeight: '30px',
                maxHeight: isOpen ? '150px' : '30px',
                borderRadius: '8px',
                border: '1px solid ',
                '&:hover': {
                    borderColor: 'black'
                }
            }}
        >
            {isSearch ? (
                isSearch && (
                    <input
                        type="text"
                        className='text-deepPurple'
                        onChange={event => onSearch(event)}
                        value={searchContent !== '' ? searchContent : ''}
                        placeholder={placeHolder}
                        disabled={disable}
                        style={{
                            cursor: disable ? 'not-allowed' : 'pointer',
                            background: disable ? '#EEEEEE' : '#EEEEEE',
                            width: '165px',
                            margin: '7px 13px',
                            fontSize: '14px',
                            fontFamily: 'inherit',
                            fontWeight: '600',
                            borderBottom: '1px solid #5F70BD',
                            '&:hover': {
                                borderBottom: '2px solid #5F70BD',
                                marginBottom: '6px'
                            },
                            '&:focus-visible': {
                                outline: 'none',
                                borderBottom: '2px solid #5F70BD'
                            }
                        }}
                    />
                )
            ) : selectedValue && !isOpen ? (
                <p style={{marginLeft: '10px'}}>{selectedValue}</p>
            ) : (
                !isSearch && !isOpen && <p style={{marginLeft: '10px', color: 'lightgray'}}>{placeHolder}</p>
            )}

            {selectorList && isOpen && (
                <div style={{maxHeight: openHeight ? openHeight : '250px', overflowY: 'scroll', overflowX: 'hidden'}}>
                    {
                        selectorList.map((data, id) => {
                            if (searchContent && data.toLowerCase().includes(searchContent.toLowerCase())) {
                                return (
                                    <div
                                        className='text-deepPurple'
                                        key={id}
                                        onClick={() => setter(data)}
                                        style={{
                                            padding: '7px 13px',
                                            '&:hover': {
                                                backgroundColor: '#E5E5E5'
                                            }
                                        }}
                                    >
                                        {data}
                                    </div>
                                );
                            } else if (!searchContent)
                                return (
                                    <div
                                        className='text-deepPurple'
                                        key={id}
                                        onClick={() => setter(data)}
                                        style={{
                                            padding: '7px 13px',
                                            '&:hover': {
                                                backgroundColor: '#E5E5E5'
                                            }
                                        }}
                                    >
                                        {data}
                                    </div>
                                );
                        })
                    }{' '}
                </div>
            )}
        </div>
    );
}

export default Selector;
