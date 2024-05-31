"use client";

import { useMemo } from "react";

import type { WithAny, WithClassName } from "@/types/common";
import { Box } from "@mui/material";

import { useContentfulContext } from "@/hooks/contentful";

let previousComponent: string | null = null;

export type ComponentResolverSharedProps = WithAny &
  WithClassName & {
    componentProps: ComponentProps;
    forceGql?: boolean;
    inline?: boolean;
  };

export type ComponentProps = WithAny & {
  sys: { id: string };
  __typename: string;
};

/**
 * Renders a shared component resolver component.
 * @param {ComponentResolverSharedProps} props - The properties to render the component with.
 * @returns The rendered shared component.
 */
const ComponentResolverShared = (props: ComponentResolverSharedProps) => {
  const {
    componentProps,
    inline = false,
    forceGql,
    className,
    ...rest
  } = props;

  const ComponentGql = componentGqlMap[componentProps.__typename];

  const { previewActive, locale } = useContentfulContext();
  const shouldForceGql = useMemo(() => {
    if (forceGql) {
      return true;
    }

    if (!ComponentGql) {
      return false;
    }

    if (componentProps && Object.keys(componentProps).length > 3) {
      return false;
    }

    if (!componentProps.__typename || !componentProps.sys) {
      return false;
    }

    return true;
  }, [ComponentGql, componentProps, forceGql]);

  const Component = !shouldForceGql && componentMap[componentProps.__typename],
    previousComponentProp = previousComponent;

  previousComponent = componentProps.__typename;

  if (!Component && !ComponentGql) {
    return null;
  }

  return (
    <Box
      position="relative"
      component={inline ? "span" : "div"}
      className={componentProps.__typename}
      {...rest}
    >
      {Component ? (
        <Component
          {...componentProps}
          locale={locale}
          className={className}
          previousComponent={previousComponentProp}
        />
      ) : (
        <ComponentGql
          id={componentProps.sys.id}
          __typename={componentProps.__typename}
          className={className}
          preview={previewActive}
          locale={locale}
          previousComponent={previousComponentProp}
        />
      )}
    </Box>
  );
};

ComponentResolverShared.displayName = "ComponentResolverShared";

export default ComponentResolverShared;
