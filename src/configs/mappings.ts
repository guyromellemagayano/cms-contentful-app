import dynamic from "next/dynamic";

// Mapping of page topics to dynamically imported components.
const pageTopicMap = {
  TopicProduct: dynamic(() =>
    import("@/components/features/ctf-components/product").then(
      (module) => module.ProductGqlCtfComponentFeature
    )
  ),
  TopicBusinessInfo: dynamic(() =>
    import("@/components/features/ctf-components/business-info").then(
      (module) => module.BusinessInfoGqlCtfComponentFeature
    )
  ),
  ComponentProductTable: dynamic(() =>
    import("@/components/features/ctf-components/product-table").then(
      (module) => module.ProductTableGqlCtfComponentFeature
    )
  ),
};

// Mapping of component names to their corresponding dynamic imports.
export const componentMap = {
  ComponentCta: dynamic(() =>
    import("@/components/features/ctf-components/cta").then(
      (module) => module.CtaCtfComponentFeature
    )
  ),
  ComponentDuplex: dynamic(() =>
    import("@/components/features/ctf-components/duplex").then(
      (module) => module.DuplexCtfComponentFeature
    )
  ),
  ComponentHeroBanner: dynamic(() =>
    import("@/components/features/ctf-components/hero-banner").then(
      (module) => module.HeroBannerCtfComponentFeature
    )
  ),
  ComponentInfoBlock: dynamic(() =>
    import("@/components/features/ctf-components/info-block").then(
      (module) => module.InfoBlockCtfComponentFeature
    )
  ),
  ComponentQuote: dynamic(() =>
    import("@/components/features/ctf-components/quote").then(
      (module) => module.QuoteCtfComponentFeature
    )
  ),
  ComponentTextBlock: dynamic(() =>
    import("@/components/features/ctf-components/text-block").then(
      (module) => module.TextBlockCtfComponentFeature
    )
  ),
  TopicPerson: dynamic(() =>
    import("@/components/features/ctf-components/person").then(
      (module) => module.PersonCtfComponentFeature
    )
  ),
};

// Mapping of component names to their corresponding GraphQL modules.
export const componentGqlMap = {
  ...pageTopicMap,
  ComponentCta: dynamic(() =>
    import("@/components/features/ctf-components/cta").then(
      (module) => module.CtaGqlCtfComponentFeature
    )
  ),
  ComponentDuplex: dynamic(() =>
    import("@/components/features/ctf-components/duplex").then(
      (module) => module.DuplexGqlCtfComponentFeature
    )
  ),
  ComponentHeroBanner: dynamic(() =>
    import("@/components/features/ctf-components/hero-banner").then(
      (module) => module.HeroBannerGqlCtfComponentFeature
    )
  ),
  ComponentInfoBlock: dynamic(() =>
    import("@/components/features/ctf-components/info-block").then(
      (module) => module.InfoBlockGqlCtfComponentFeature
    )
  ),
  ComponentQuote: dynamic(() =>
    import("@/components/features/ctf-components/quote").then(
      (module) => module.QuoteGqlCtfComponentFeature
    )
  ),
  ComponentTextBlock: dynamic(() =>
    import("@/components/features/ctf-components/text-block").then(
      (module) => module.TextBlockGqlCtfComponentFeature
    )
  ),
  TopicPerson: dynamic(() =>
    import("@/components/features/ctf-components/person").then(
      (module) => module.PersonGqlCtfComponentFeature
    )
  ),
  ComponentFooter: dynamic(() =>
    import("@/components/features/ctf-components/footer").then(
      (module) => module.FooterGqlCtfComponentFeature
    )
  ),
};
