import React from "react";

function ArrowBtnIcon({ hover }) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M21.984 50.6998C22.445 50.7014 22.9006 50.5996 23.3172 50.4021C23.7338 50.2045 24.1008 49.9161 24.3913 49.5582L39.2979 31.0456C39.7519 30.4936 40 29.8011 40 29.0864C40 28.3717 39.7519 27.6792 39.2979 27.1271L23.8666 8.61462C23.3427 7.98452 22.5899 7.58828 21.7739 7.51306C20.9578 7.43784 20.1452 7.6898 19.5149 8.21351C18.8847 8.73723 18.4883 9.4898 18.4131 10.3057C18.3378 11.1215 18.5899 11.9339 19.1137 12.564L32.9094 29.1018L19.5767 45.6397C19.1993 46.0926 18.9595 46.6441 18.8858 47.2289C18.8121 47.8138 18.9076 48.4075 19.1608 48.9398C19.4141 49.4721 19.8145 49.9208 20.3148 50.2327C20.8152 50.5446 21.3944 50.7067 21.984 50.6998Z"
          fill="#DBDBDB"
        />
      </g>
      <defs>
        {hover ? (
          <filter
            id="filter0_d"
            x="13.4"
            y="2.5"
            width="31.6"
            height="53.2"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        ) : (
          <filter
            id="filter0_d"
            x="16.4"
            y="5.5"
            width="25.6"
            height="47.2"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        )}
      </defs>
    </svg>
  );
}

export default ArrowBtnIcon;

{/* <svg
  width="60"
  height="60"
  viewBox="0 0 60 60"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g filter="url(#filter0_d)">
    <path
      d="M21.984 50.6998C22.445 50.7014 22.9006 50.5996 23.3172 50.4021C23.7338 50.2045 24.1008 49.9161 24.3913 49.5582L39.2979 31.0456C39.7519 30.4936 40 29.8011 40 29.0864C40 28.3717 39.7519 27.6792 39.2979 27.1271L23.8666 8.61462C23.3427 7.98452 22.5899 7.58828 21.7739 7.51306C20.9578 7.43784 20.1452 7.6898 19.5149 8.21351C18.8847 8.73723 18.4883 9.4898 18.4131 10.3057C18.3378 11.1215 18.5899 11.9339 19.1137 12.564L32.9094 29.1018L19.5767 45.6397C19.1993 46.0926 18.9595 46.6441 18.8858 47.2289C18.8121 47.8138 18.9076 48.4075 19.1608 48.9398C19.4141 49.4721 19.8145 49.9208 20.3148 50.2327C20.8152 50.5446 21.3944 50.7067 21.984 50.6998Z"
      fill="#F6F6F6"
    />
  </g>
  <defs>
    <filter
      id="filter0_d"
      x="13.4"
      y="2.5"
      width="31.6"
      height="53.2"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
      />
      <feOffset />
      <feGaussianBlur stdDeviation="2.5" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow"
        result="shape"
      />
    </filter>
  </defs>
</svg>; */}
