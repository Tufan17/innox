import React, { forwardRef, ReactNode, Ref } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

interface SvgColorProps {
  src?: string;
  sx?: React.CSSProperties;
  children?: ReactNode;
}

const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, sx, ...other }: SvgColorProps, ref: Ref<HTMLSpanElement>) => (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  )
);

SvgColor.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default SvgColor;
