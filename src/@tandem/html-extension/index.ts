import { CSS_MIME_TYPE, HTML_MIME_TYPE } from "@tandem/common";
import { IApplication } from "@tandem/common/application";

// components
import { cssPaneComponentDependency } from "./components/css-pane";
import { cssColorTokenComponentFactoryDependency } from "./components/css-color-token";

// stage tool components
import { cssHighlightElementToolComponentFactoryDependency } from "./components/css-highlight-element-tool";

// sandbox
import { HTMLCSSModule } from "./sandbox";

import { HTML_XMLNS, SyntheticDOMNodeEntityClassDependency } from "@tandem/synthetic-browser";

import { 
  SyntheticHTMLImageEntity,
  SyntheticHTMLLinkEntity,
  SyntheticHTMLDocumentEntity,
  SyntheticVisibleHTMLEntity,
} from "./synthetic";

import { MarkupModule, HTML_TAG_NAMES } from "@tandem/synthetic-browser";
import { ModuleFactoryDependency } from "@tandem/sandbox";

// layer components
import { textLayerLabelComponentDependency } from "./components/text-layer-label";
import { elementLayerLabelComponentDependency } from "./components/element-layer-label";
import { commentLayerLabelComponentDependency } from "./components/comment-layer-label";
import { cssRuleLayerLabelComponentDependency } from "./components/css-rule-layer-label";
import { cssAtRuleLayerLabelComponentDependency } from "./components/css-atrule-layer-label";
import { cssCommentLayerLabelComponentDependency } from "./components/css-comment-layer-label";
import { cssDeclarationLayerLabelComponentDependency } from "./components/css-declaration-layer-label";

// token components
import { cssUnitEditorTokenComponentFactoryDependency } from "./components/css-unit-editor-token";
import { cssNumericEditorTokenComponentFactoryDependency } from "./components/css-numeric-editor-token";
import { cssReferenceEditorTokenComponentFactoryDependency } from "./components/css-reference-editor-token";

// services
import { pastHTMLServiceDependency, cssSelectorServiceDependency  } from "./services";

 // tools
import { textToolDependency, editInnerHTMLDependency } from "./models/text-tool";

// key bindings
import { keyBindingDependency } from "./key-bindings";

import { MimeTypeDependency } from "@tandem/common/dependencies";

 // entities
 import {
   htmlTextDependency,
   htmlCommentDependency,
   htmlStyleEntityDependency,
   htmlDocumentFragmentDependency,
   cssRuleEntityFactoryDependency,
   defaultElementFactoyDependency,
   cssDeclarationEntityDependency,
   cssAtRuleEntityFactoryDependency,
   defaultAttributeFactoryDependency,
   cssCommentEntityFactoryDependency,
} from "./lang";

const visibleEntityDependencies = HTML_TAG_NAMES.map((tagName) => new SyntheticDOMNodeEntityClassDependency(HTML_XMLNS, tagName, SyntheticVisibleHTMLEntity));

export const htmlExtensionDependency = [

  // components
  cssPaneComponentDependency,
  cssAtRuleLayerLabelComponentDependency,
  cssCommentLayerLabelComponentDependency,
  cssColorTokenComponentFactoryDependency,

  // sandbox
  new ModuleFactoryDependency(CSS_MIME_TYPE, CSS_MIME_TYPE, HTMLCSSModule),
  new ModuleFactoryDependency(HTML_MIME_TYPE, HTML_MIME_TYPE, MarkupModule),
  new SyntheticDOMNodeEntityClassDependency(HTML_XMLNS, "img", SyntheticHTMLImageEntity),
  new SyntheticDOMNodeEntityClassDependency(undefined, "#document", SyntheticHTMLDocumentEntity),
  new SyntheticDOMNodeEntityClassDependency(HTML_XMLNS, "link", SyntheticHTMLLinkEntity),
  ...visibleEntityDependencies,

  // stage tool components
  cssHighlightElementToolComponentFactoryDependency,

  // layer components
  textLayerLabelComponentDependency,
  defaultAttributeFactoryDependency,
  commentLayerLabelComponentDependency,
  elementLayerLabelComponentDependency,
  cssRuleLayerLabelComponentDependency,
  cssDeclarationLayerLabelComponentDependency,

  // unit components
  cssUnitEditorTokenComponentFactoryDependency,
  cssNumericEditorTokenComponentFactoryDependency,
  cssReferenceEditorTokenComponentFactoryDependency,

  // services
  pastHTMLServiceDependency,
  cssSelectorServiceDependency,

  // tools
  textToolDependency,
  editInnerHTMLDependency,

  // key bindings
  keyBindingDependency,

  // entities
  htmlTextDependency,
  htmlCommentDependency,
  htmlStyleEntityDependency,
  defaultElementFactoyDependency,
  htmlDocumentFragmentDependency,
  cssRuleEntityFactoryDependency,
  cssDeclarationEntityDependency,
  cssAtRuleEntityFactoryDependency,
  cssCommentEntityFactoryDependency,

  // mime types
  new MimeTypeDependency("css", CSS_MIME_TYPE),
  new MimeTypeDependency("htm", HTML_MIME_TYPE),
  new MimeTypeDependency("html", HTML_MIME_TYPE)
];

export * from "./actions";
export * from "./lang";
export * from "./constants";
export * from "./dom";
export * from "./key-bindings";
export * from "./services";
export * from "./synthetic";