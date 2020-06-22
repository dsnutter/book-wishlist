import React, { useState } from 'react';
import Select from '../controls/select';

const BookImage = ({ books }) => {

    const [bookTitle1, setBookTitle1] = useState('');
    const [bookTitle2, setBookTitle2] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');

    const specifyBook = (selectedItem) => {
        let title = [];
        const numChars = 25;
        // break up title into two lines
        if (selectedItem.title.length > numChars) {
            const numCharsPerLine = Math.floor(selectedItem.title.length / 2);
            title = selectedItem.title.split(' ');
            let titlePart1 = '';
            let titlePart2 = '';
            for (let i = 0; i < title.length; i++) {
                if (titlePart1.length < numCharsPerLine) {
                    if (titlePart1 !== '') titlePart1 += ' ';
                    titlePart1 += title[i];
                } else {
                    if (titlePart2 !== '') titlePart2 += ' ';
                    titlePart2 += title[i]
                }
            }
            setBookTitle1(titlePart1);
            setBookTitle2(titlePart2);
        } else {
            setBookTitle1(selectedItem.title);
            setBookTitle2('');
        }
        setBookAuthor(selectedItem.author);
    };

    return (
        <>
            <Select 
                options={books}
                getOptionValue={(book) => book}
                getOptionLabel={(book) => book.title + ' - ' + book.author}
                onChange={specifyBook}
            />
            <br />
            <svg height="980" width="784" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <g>
                    <rect fill="none" id="canvas_background" height="980" width="784" y="-1" x="-1"/>
                </g>
                <g>
                    <g id="svg_1" fill="#000000" transform="translate(0,980) scale(0.10000000149011612,-0.10000000149011612) ">
                        <path id="svg_2" d="m805,9784c-378,-68 -670,-336 -772,-709l-28,-100l0,-3980c0,-3816 1,-3983 18,-4063c27,-121 59,-210 118,-322c154,-295 419,-495 769,-583l85,-21l3422,-3l3423,-3l0,4115l0,4115l-117,0c-226,1 -354,49 -489,184c-123,124 -174,243 -174,406c0,163 51,282 174,406c135,135 263,183 489,184l117,0l0,195l0,195l-3477,-1c-2981,-1 -3489,-3 -3558,-15zm6009,-451c-195,-342 -195,-684 0,-1026l45,-77l-2992,2l-2992,3l-55,21c-151,58 -251,133 -327,246c-68,102 -97,197 -97,318c-1,229 128,426 345,531c125,61 -76,57 3151,58l2966,1l-44,-77zm-6368,-1334c70,-48 202,-106 295,-130c77,-21 113,-23 457,-26l372,-5l0,-3724l0,-3724l-219,0c-151,0 -245,5 -306,15c-302,53 -542,272 -628,574l-22,76l-3,3488c-1,1918 0,3487 4,3487c3,0 26,-14 50,-31zm7004,-3884l0,-3725l-2745,0l-2745,0l0,3725l0,3725l2745,0l2745,0l0,-3725z"/>
                    </g>
                    <text fontStyle="italic" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="28" id="svg_3" x="430" y={(bookTitle2 === '' ? 430 : 375)} strokeWidth="0" stroke="#000" fill="#000000">{bookTitle1}</text>
                    {bookTitle2 && 
                        <text fontStyle="italic" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="28"  id="svg_4" x="430" y="430" strokeWidth="0" stroke="#000" fill="#000000">{bookTitle2}</text>
                    }
                    {bookAuthor &&
                        <text fontStyle="italic" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="28"  id="svg_5" x="430" y="525" strokeWidth="0" stroke="#000" fill="#000000">by</text>
                    }
                    <text textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="28"  id="svg_6" x="430" y="600" strokeWidth="0" stroke="#000" fill="#000000">{bookAuthor}</text>
                </g>
            </svg>
        </>
    );
};

export default BookImage;