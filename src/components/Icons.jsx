import React from 'react';

export const ShopIcon = (props) => {
  return (
    <svg
      width={24}
      height={24}
      strokeWidth={2}
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      {...props}
    >
      <path d='M0 0h24v24H0z' stroke='none' />
      <circle cx={6} cy={19} r={2} />
      <circle cx={17} cy={19} r={2} />
      <path d='M17 17H6V3H4' />
      <path d='m6 5 14 1-1 7H6' />
    </svg>
  );
};

export const ShopCartOffIcon = (props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
      <path d='M17 17a2 2 0 1 0 2 2'></path>
      <path d='M17 17h-11v-11'></path>
      <path d='M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7'></path>
      <path d='M3 3l18 18'></path>
    </svg>
  );
};
