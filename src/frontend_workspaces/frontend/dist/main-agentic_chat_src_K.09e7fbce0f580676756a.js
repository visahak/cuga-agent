"use strict";
(self["webpackChunk_carbon_ai_chat_examples_web_components_basic"] = self["webpackChunk_carbon_ai_chat_examples_web_components_basic"] || []).push([["main-agentic_chat_src_K"],{

/***/ "../agentic_chat/src/KnowledgeConfig.tsx":
/*!***********************************************!*\
  !*** ../agentic_chat/src/KnowledgeConfig.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ KnowledgeConfig; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _ConfigModal_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigModal.css */ "../agentic_chat/src/ConfigModal.css");



function KnowledgeConfig({
  onClose
}) {
  const [config, setConfig] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    sources: [],
    embeddingModel: "text-embedding-3-small",
    chunkSize: 1000,
    chunkOverlap: 200
  });
  const [saveStatus, setSaveStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("idle");
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadConfig();
  }, []);
  const loadConfig = async () => {
    try {
      const response = await fetch('/api/config/knowledge');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };
  const saveConfig = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch('/api/config/knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };
  const addSource = () => {
    const newSource = {
      id: Date.now().toString(),
      name: "New Source",
      type: "file",
      enabled: true
    };
    setConfig({
      ...config,
      sources: [...config.sources, newSource]
    });
  };
  const updateSource = (id, updates) => {
    setConfig({
      ...config,
      sources: config.sources.map(source => source.id === id ? {
        ...source,
        ...updates
      } : source)
    });
  };
  const removeSource = id => {
    setConfig({
      ...config,
      sources: config.sources.filter(source => source.id !== id)
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Knowledge Configuration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "config-modal-close",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 20
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Embedding Settings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Embedding Model"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: config.embeddingModel,
    onChange: e => setConfig({
      ...config,
      embeddingModel: e.target.value
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "text-embedding-3-small"
  }, "text-embedding-3-small"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "text-embedding-3-large"
  }, "text-embedding-3-large"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "text-embedding-ada-002"
  }, "text-embedding-ada-002"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Chunk Size"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "number",
    value: config.chunkSize,
    onChange: e => setConfig({
      ...config,
      chunkSize: parseInt(e.target.value)
    }),
    min: "100",
    max: "4000"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Chunk Overlap"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "number",
    value: config.chunkOverlap,
    onChange: e => setConfig({
      ...config,
      chunkOverlap: parseInt(e.target.value)
    }),
    min: "0",
    max: "1000"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Knowledge Sources"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "add-btn",
    onClick: addSource
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
    size: 16
  }), "Add Source")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sources-list"
  }, config.sources.map(source => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: source.id,
    className: "source-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "source-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: source.enabled,
    onChange: e => updateSource(source.id, {
      enabled: e.target.checked
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: source.name,
    onChange: e => updateSource(source.id, {
      name: e.target.value
    }),
    className: "source-name"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: source.type,
    onChange: e => updateSource(source.id, {
      type: e.target.value
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "file"
  }, "File"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "url"
  }, "URL"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "database"
  }, "Database")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "delete-btn",
    onClick: () => removeSource(source.id)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
    size: 16
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "source-details"
  }, source.type === "file" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: source.path || "",
    onChange: e => updateSource(source.id, {
      path: e.target.value
    }),
    placeholder: "File path..."
  })), source.type === "url" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: source.url || "",
    onChange: e => updateSource(source.id, {
      url: e.target.value
    }),
    placeholder: "https://..."
  })))))), config.sources.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No knowledge sources configured. Click \"Add Source\" to get started.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "cancel-btn",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `save-btn ${saveStatus}`,
    onClick: saveConfig,
    disabled: saveStatus === "saving"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Save, {
    size: 16
  }), saveStatus === "idle" && "Save Changes", saveStatus === "saving" && "Saving...", saveStatus === "success" && "Saved!", saveStatus === "error" && "Error!"))));
}

/***/ }),

/***/ "../agentic_chat/src/LeftSidebar.tsx":
/*!*******************************************!*\
  !*** ../agentic_chat/src/LeftSidebar.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LeftSidebar: function() { return /* binding */ LeftSidebar; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _LeftSidebar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LeftSidebar.css */ "../agentic_chat/src/LeftSidebar.css");
/* harmony import */ var _VariablesSidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VariablesSidebar */ "../agentic_chat/src/VariablesSidebar.tsx");




const ENABLE_CHAT_HISTORY = false;
const ENABLE_SAVED_FLOWS = false;
function LeftSidebar({
  globalVariables,
  variablesHistory,
  selectedAnswerId,
  onSelectAnswer,
  isCollapsed = false,
  activeTab = "conversations",
  onTabChange,
  leftSidebarRef
}) {
  const [isExpanded, setIsExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!isCollapsed);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsExpanded(!isCollapsed);
  }, [isCollapsed]);

  // Debug logging for variables
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log('[LeftSidebar] globalVariables updated:', Object.keys(globalVariables).length, 'keys');
    console.log('[LeftSidebar] variablesHistory updated:', variablesHistory.length, 'items');
  }, [globalVariables, variablesHistory]);
  const [conversations, setConversations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [selectedConversation, setSelectedConversation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [savedFlows, setSavedFlows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [hoveredFlowId, setHoveredFlowId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [tooltipPosition, setTooltipPosition] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log('[LeftSidebar] Component mounted');
    loadConversations();
    loadSavedFlows();
  }, []);
  const loadConversations = async () => {
    try {
      const response = await fetch('/api/conversations');
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
    }
  };
  const createNewConversation = async customTitle => {
    console.log('[LeftSidebar] createNewConversation called with title:', customTitle);
    const newConv = {
      id: `conv-${Date.now()}`,
      title: customTitle || "New Conversation",
      timestamp: Date.now()
    };

    // Always add conversation locally first for immediate UI feedback
    console.log('[LeftSidebar] Adding conversation locally:', newConv);
    setConversations(prevConversations => [newConv, ...prevConversations]);
    setSelectedConversation(newConv.id);

    // Try to sync with API (but don't fail if API is unavailable)
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: customTitle || "New Conversation",
          timestamp: Date.now()
        })
      });
      if (response.ok) {
        const apiConv = await response.json();
        console.log('[LeftSidebar] API sync successful:', apiConv);
        // Update with API response if needed
        setConversations(prevConversations => prevConversations.map(conv => conv.id === newConv.id ? {
          ...apiConv,
          id: newConv.id
        } : conv));
      } else {
        console.warn('[LeftSidebar] API call failed but local conversation added');
      }
    } catch (error) {
      console.warn('[LeftSidebar] API error but local conversation added:', error);
    }
  };

  // Function to add a conversation programmatically
  const addConversation = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(title => {
    createNewConversation(title);
  }, []);

  // Expose addConversation function via ref
  react__WEBPACK_IMPORTED_MODULE_0___default().useImperativeHandle(leftSidebarRef, () => ({
    addConversation
  }), [addConversation]);

  // Debug: log when ref is set
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => {
    if (leftSidebarRef?.current) {
      console.log('[LeftSidebar] Ref is set, addConversation available');
    }
  }, [leftSidebarRef?.current]);
  const deleteConversation = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setConversations(conversations.filter(c => c.id !== id));
        if (selectedConversation === id) {
          setSelectedConversation(null);
        }
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };
  const loadSavedFlows = async () => {
    try {
      const response = await fetch('/api/flows');
      if (response.ok) {
        const data = await response.json();
        setSavedFlows(data.flows || []);
      } else {
        setSavedFlows([]);
      }
    } catch (error) {
      console.error("Error loading saved flows:", error);
      setSavedFlows([]);
    }
  };
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (minutes < 1) return "1 minute ago";
    if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    if (days === 1) return "now";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };
  if (!isExpanded) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "left-sidebar-floating-toggle",
      onClick: () => setIsExpanded(true)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronRight, {
      size: 20
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sidebar-floating-count"
    }, conversations.length));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `left-sidebar ${isExpanded ? "expanded" : "collapsed"}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "left-sidebar-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "left-sidebar-tabs"
  }, ENABLE_CHAT_HISTORY && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `sidebar-tab ${activeTab === "conversations" ? "active" : ""}`,
    onClick: () => onTabChange ? onTabChange("conversations") : null
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.MessageSquare, {
    size: 16
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Chats")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `sidebar-tab ${activeTab === "variables" ? "active" : ""}`,
    onClick: () => onTabChange ? onTabChange("variables") : null
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Database, {
    size: 16
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Variables"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sidebar-tab-info-tooltip-wrapper",
    onClick: e => e.stopPropagation(),
    onMouseEnter: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.HelpCircle, {
    size: 14,
    className: "sidebar-info-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sidebar-tab-info-tooltip"
  }, "Variables are the results from task execution. Ask any question about the variables and CUGA will respond."))), ENABLE_SAVED_FLOWS && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `sidebar-tab ${activeTab === "savedflows" ? "active" : ""}`,
    onClick: () => onTabChange ? onTabChange("savedflows") : null
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Workflow, {
    size: 16
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Saved Flows"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "left-sidebar-toggle",
    onClick: () => setIsExpanded(false)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronLeft, {
    size: 18
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "left-sidebar-content"
  }, ENABLE_CHAT_HISTORY && activeTab === "conversations" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "conversations-actions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "new-conversation-btn",
    onClick: () => createNewConversation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
    size: 16
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "New Chat"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "conversations-list"
  }, conversations.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.MessageSquare, {
    size: 32
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No conversations yet"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Start a new chat to begin")) : conversations.map(conv => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: conv.id,
    className: `conversation-item ${selectedConversation === conv.id ? "selected" : ""}`,
    onClick: () => setSelectedConversation(conv.id)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "conversation-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.MessageSquare, {
    size: 14
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "conversation-title"
  }, conv.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "delete-conversation-btn",
    onClick: e => deleteConversation(conv.id, e)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
    size: 14
  }))), conv.preview && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "conversation-preview"
  }, conv.preview), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "conversation-date"
  }, formatDate(conv.timestamp)))))) : activeTab === "variables" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "variables-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VariablesSidebar__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variables: globalVariables,
    history: variablesHistory,
    selectedAnswerId: selectedAnswerId,
    onSelectAnswer: onSelectAnswer
  })) : ENABLE_SAVED_FLOWS && activeTab === "savedflows" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "conversations-list"
  }, savedFlows.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Workflow, {
    size: 32
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No saved flows yet"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Saved flows will appear here")) : savedFlows.map(flow => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: flow.id,
    className: "conversation-item flow-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "conversation-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Workflow, {
    size: 14
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "conversation-title"
  }, flow.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flow-info-icon-wrapper",
    onMouseEnter: e => {
      const rect = e.currentTarget.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const tooltipWidth = 300;
      const tooltipHeight = 120; // approximate height

      // Position tooltip to the right if there's space, otherwise to the left
      let left = rect.right + 12;
      if (left + tooltipWidth > viewportWidth) {
        left = rect.left - tooltipWidth - 12;
      }

      // Ensure tooltip doesn't go off the top or bottom
      let top = rect.top;
      if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - 10;
      }
      if (top < 10) {
        top = 10;
      }
      setTooltipPosition({
        top,
        left
      });
      setHoveredFlowId(flow.id);
    },
    onMouseLeave: e => {
      // Only hide if the mouse is not entering the tooltip area
      const tooltip = document.querySelector('.flow-info-tooltip');
      if (tooltip) {
        const tooltipRect = tooltip.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Check if mouse is within tooltip bounds
        if (mouseX >= tooltipRect.left && mouseX <= tooltipRect.right && mouseY >= tooltipRect.top && mouseY <= tooltipRect.bottom) {
          return; // Keep tooltip visible
        }
      }
      setHoveredFlowId(null);
      setTooltipPosition(null);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Info, {
    size: 14,
    className: "flow-info-icon"
  }))), flow.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "conversation-preview"
  }, flow.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flow-parameters"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flow-function-signature"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", null, flow.name, "("), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flow-params-list"
  }, flow.parameters.map((param, idx) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: idx,
    className: "flow-param"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", {
    className: "param-name"
  }, param.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "param-type"
  }, ": ", param.type), !param.required && param.default !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "param-default"
  }, " = ", JSON.stringify(param.default)), param.required && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "param-required"
  }, "*"), idx < flow.parameters.length - 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, ",")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", null, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "conversation-date"
  }, formatDate(flow.timestamp)))))) : null), hoveredFlowId && tooltipPosition && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flow-info-tooltip",
    style: {
      top: `${tooltipPosition.top}px`,
      left: `${tooltipPosition.left}px`
    },
    onMouseEnter: () => {
      // Keep tooltip visible when mouse enters it
      setHoveredFlowId(hoveredFlowId);
    },
    onMouseLeave: () => {
      // Hide tooltip when mouse leaves
      setHoveredFlowId(null);
      setTooltipPosition(null);
    }
  }, "Saved from a previous conversation where you completed a similar task using CRM, filesystem, and email tools. Reuse this flow to repeat the same pattern with different parameters."));
}

/***/ }),

/***/ "../agentic_chat/src/MemoryConfig.tsx":
/*!********************************************!*\
  !*** ../agentic_chat/src/MemoryConfig.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MemoryConfig; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _ConfigModal_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigModal.css */ "../agentic_chat/src/ConfigModal.css");



function MemoryConfig({
  onClose
}) {
  const [config, setConfig] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    enableMemory: true,
    disableMemory: false,
    memoryType: "both",
    contextWindow: 4096,
    maxMemoryItems: 100,
    semanticSearch: true,
    autoSummarization: true,
    factStorage: false,
    learningFromFailures: false,
    blockedMemoryItems: [],
    saveAndReuse: {
      enabled: false,
      autoGeneralize: false,
      minSuccessfulRuns: 3,
      requireApproval: true,
      savedTrajectories: []
    }
  });
  const [saveStatus, setSaveStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("idle");
  const [newBlockedItem, setNewBlockedItem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [expandedTrajectory, setExpandedTrajectory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadConfig();
  }, []);
  const loadConfig = async () => {
    try {
      const response = await fetch('/api/config/memory');
      if (response.ok) {
        const data = await response.json();
        setConfig({
          enableMemory: data.enableMemory ?? true,
          disableMemory: data.disableMemory ?? false,
          memoryType: data.memoryType ?? "both",
          contextWindow: data.contextWindow ?? 4096,
          maxMemoryItems: data.maxMemoryItems ?? 100,
          semanticSearch: data.semanticSearch ?? true,
          autoSummarization: data.autoSummarization ?? true,
          factStorage: data.factStorage ?? false,
          learningFromFailures: data.learningFromFailures ?? false,
          blockedMemoryItems: data.blockedMemoryItems ?? [],
          saveAndReuse: data.saveAndReuse ?? {
            enabled: false,
            autoGeneralize: false,
            minSuccessfulRuns: 3,
            requireApproval: true,
            savedTrajectories: []
          }
        });
      }
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };
  const saveConfig = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch('/api/config/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };
  const addBlockedItem = () => {
    if (newBlockedItem.trim() && !config.blockedMemoryItems.includes(newBlockedItem.trim())) {
      setConfig({
        ...config,
        blockedMemoryItems: [...config.blockedMemoryItems, newBlockedItem.trim()]
      });
      setNewBlockedItem("");
    }
  };
  const removeBlockedItem = item => {
    setConfig({
      ...config,
      blockedMemoryItems: config.blockedMemoryItems.filter(i => i !== item)
    });
  };
  const toggleTrajectory = id => {
    setConfig({
      ...config,
      saveAndReuse: {
        ...config.saveAndReuse,
        savedTrajectories: config.saveAndReuse.savedTrajectories.map(t => t.id === id ? {
          ...t,
          enabled: !t.enabled
        } : t)
      }
    });
  };
  const deleteTrajectory = id => {
    setConfig({
      ...config,
      saveAndReuse: {
        ...config.saveAndReuse,
        savedTrajectories: config.saveAndReuse.savedTrajectories.filter(t => t.id !== id)
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Memory Configuration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "config-modal-close",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 20
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Memory Settings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.disableMemory,
    onChange: e => {
      const disabled = e.target.checked;
      setConfig({
        ...config,
        disableMemory: disabled,
        enableMemory: disabled ? false : config.enableMemory
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Disable Memory Completely")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Turn off all memory functionality")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.enableMemory,
    onChange: e => setConfig({
      ...config,
      enableMemory: e.target.checked
    }),
    disabled: config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Enable Memory System")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Allow the agent to remember context across conversations")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Max Memory Items"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "number",
    value: config.maxMemoryItems,
    onChange: e => setConfig({
      ...config,
      maxMemoryItems: parseInt(e.target.value)
    }),
    min: "10",
    max: "1000",
    disabled: !config.enableMemory || config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Maximum number of memory items to store")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.semanticSearch,
    onChange: e => setConfig({
      ...config,
      semanticSearch: e.target.checked
    }),
    disabled: !config.enableMemory || config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Enable Semantic Search")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Use embeddings to find relevant memories")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.autoSummarization,
    onChange: e => setConfig({
      ...config,
      autoSummarization: e.target.checked
    }),
    disabled: !config.enableMemory || config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Auto-summarization")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Automatically summarize long conversations")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.factStorage,
    onChange: e => setConfig({
      ...config,
      factStorage: e.target.checked
    }),
    disabled: !config.enableMemory || config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Enable Fact Storage and Retrieval")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Store and retrieve important facts like IDs, key values, and persistent information")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.learningFromFailures,
    onChange: e => setConfig({
      ...config,
      learningFromFailures: e.target.checked
    }),
    disabled: !config.enableMemory || config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Enable Learning from Failures and Tip Injection")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Learn from past failures and analyze trajectories to improve future task performance")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Blocked Memory Items"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: newBlockedItem,
    onChange: e => setNewBlockedItem(e.target.value),
    onKeyPress: e => {
      if (e.key === "Enter") {
        e.preventDefault();
        addBlockedItem();
      }
    },
    placeholder: "e.g., passwords, secrets",
    disabled: config.disableMemory,
    style: {
      width: "200px",
      padding: "4px 8px",
      fontSize: "12px"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "add-small-btn",
    onClick: addBlockedItem,
    disabled: config.disableMemory || !newBlockedItem.trim()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
    size: 12
  }), "Add"))), config.blockedMemoryItems.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policies-empty"
  }, "No blocked items. Add items that the agent should never remember.") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policies-list"
  }, config.blockedMemoryItems.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "policy-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      flex: 1,
      padding: "8px",
      fontSize: "13px"
    }
  }, item), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "remove-btn",
    onClick: () => removeBlockedItem(item),
    disabled: config.disableMemory
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 14
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Items the agent is not allowed to remember (e.g., sensitive information, passwords)")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Save & Reuse Trajectories"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.saveAndReuse.enabled,
    onChange: e => setConfig({
      ...config,
      saveAndReuse: {
        ...config.saveAndReuse,
        enabled: e.target.checked
      }
    }),
    disabled: config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Enable Save & Reuse")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Allow agent to save successful task trajectories as reusable tools")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.saveAndReuse.autoGeneralize,
    onChange: e => setConfig({
      ...config,
      saveAndReuse: {
        ...config.saveAndReuse,
        autoGeneralize: e.target.checked
      }
    }),
    disabled: !config.saveAndReuse.enabled || config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Auto-generalize Trajectories")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Automatically identify patterns and create reusable tools from successful tasks")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Min. Successful Runs Before Saving"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "number",
    value: config.saveAndReuse.minSuccessfulRuns,
    onChange: e => setConfig({
      ...config,
      saveAndReuse: {
        ...config.saveAndReuse,
        minSuccessfulRuns: parseInt(e.target.value)
      }
    }),
    min: "1",
    max: "10",
    disabled: !config.saveAndReuse.enabled || config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Number of successful executions before suggesting trajectory as reusable tool")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.saveAndReuse.requireApproval,
    onChange: e => setConfig({
      ...config,
      saveAndReuse: {
        ...config.saveAndReuse,
        requireApproval: e.target.checked
      }
    }),
    disabled: !config.saveAndReuse.enabled || config.disableMemory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Require User Approval")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Ask for permission before saving new trajectories as tools")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group",
    style: {
      marginTop: "24px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    style: {
      fontSize: "14px",
      fontWeight: 600,
      marginBottom: "12px",
      display: "block"
    }
  }, "Saved Trajectories (", config.saveAndReuse.savedTrajectories.length, ")"), config.saveAndReuse.savedTrajectories.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policies-empty"
  }, "No saved trajectories yet. When enabled, successful task patterns will appear here.") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policies-list",
    style: {
      maxHeight: "400px",
      overflowY: "auto"
    }
  }, config.saveAndReuse.savedTrajectories.map(trajectory => {
    const isExpanded = expandedTrajectory === trajectory.id;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: trajectory.id,
      className: "policy-item",
      style: {
        flexDirection: "column",
        alignItems: "stretch"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
      type: "checkbox",
      checked: trajectory.enabled,
      onChange: () => toggleTrajectory(trajectory.id),
      disabled: !config.saveAndReuse.enabled || config.disableMemory,
      style: {
        cursor: "pointer"
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        flex: 1,
        cursor: "pointer"
      },
      onClick: () => setExpandedTrajectory(isExpanded ? null : trajectory.id)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: "13px",
        color: "#1e293b"
      }
    }, trajectory.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        fontSize: "11px",
        color: "#64748b",
        marginTop: "2px"
      }
    }, trajectory.description)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: "flex",
        gap: "4px",
        alignItems: "center",
        fontSize: "11px",
        color: "#64748b"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Confidence: ", trajectory.confidence, "%"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "\u2022"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, trajectory.parameters.length, " params")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "remove-btn",
      onClick: () => deleteTrajectory(trajectory.id),
      disabled: !config.saveAndReuse.enabled || config.disableMemory
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
      size: 14
    }))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        padding: "12px",
        background: "#f8fafc",
        borderTop: "1px solid #e5e7eb",
        fontSize: "12px"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        marginBottom: "12px"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", {
      style: {
        color: "#475569",
        display: "block",
        marginBottom: "6px"
      }
    }, "Parameters:"), trajectory.parameters.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        color: "#94a3b8",
        fontStyle: "italic"
      }
    }, "No parameters") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }
    }, trajectory.parameters.map((param, idx) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: idx,
      style: {
        background: "white",
        padding: "6px 8px",
        borderRadius: "4px",
        border: "1px solid #e5e7eb"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("code", {
      style: {
        color: "#667eea",
        fontWeight: 600,
        fontSize: "11px"
      }
    }, param.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      style: {
        color: "#64748b"
      }
    }, ": ", param.type), param.required && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      style: {
        color: "#ef4444",
        marginLeft: "4px"
      }
    }, "*"), param.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        color: "#64748b",
        fontSize: "11px",
        marginTop: "2px"
      }
    }, param.description))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        display: "flex",
        gap: "16px",
        fontSize: "11px",
        color: "#64748b"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Min interactions: ", trajectory.minInteractions), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "\u2022"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Created: ", new Date(trajectory.createdAt).toLocaleDateString()))));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", {
    style: {
      display: "block",
      marginTop: "8px"
    }
  }, "Trajectories are automatically learned from successful task completions"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "cancel-btn",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `save-btn ${saveStatus}`,
    onClick: saveConfig,
    disabled: saveStatus === "saving"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Save, {
    size: 16
  }), saveStatus === "idle" && "Save Changes", saveStatus === "saving" && "Saving...", saveStatus === "success" && "Saved!", saveStatus === "error" && "Error!"))));
}

/***/ }),

/***/ "../agentic_chat/src/ModelConfig.tsx":
/*!*******************************************!*\
  !*** ../agentic_chat/src/ModelConfig.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ModelConfig; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _ConfigModal_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigModal.css */ "../agentic_chat/src/ConfigModal.css");



function ModelConfig({
  onClose
}) {
  const [config, setConfig] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    provider: "watsonx",
    model: "openai/gpt-oss-120b",
    temperature: 0.7,
    maxTokens: 4096,
    topP: 1.0
  });
  const [saveStatus, setSaveStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("idle");
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadConfig();
  }, []);
  const loadConfig = async () => {
    try {
      const response = await fetch('/api/config/model');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };
  const saveConfig = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch('/api/config/model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Model Configuration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "config-modal-close",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 20
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Language Model Settings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Provider"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    value: config.provider,
    onChange: e => setConfig({
      ...config,
      provider: e.target.value
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "anthropic"
  }, "Anthropic"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "openai"
  }, "OpenAI"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "azure"
  }, "Azure OpenAI"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "watsonx"
  }, "IBM watsonx"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: "ollama"
  }, "Ollama"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Model"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: config.model,
    onChange: e => setConfig({
      ...config,
      model: e.target.value
    }),
    placeholder: "e.g., claude-3-5-sonnet-20241022"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Temperature: ", config.temperature), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "range",
    min: "0",
    max: "2",
    step: "0.1",
    value: config.temperature,
    onChange: e => setConfig({
      ...config,
      temperature: parseFloat(e.target.value)
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Controls randomness: 0 = focused, 2 = creative")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Max Tokens"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "number",
    value: config.maxTokens,
    onChange: e => setConfig({
      ...config,
      maxTokens: parseInt(e.target.value)
    }),
    min: "1",
    max: "200000"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Top P: ", config.topP), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "range",
    min: "0",
    max: "1",
    step: "0.01",
    value: config.topP,
    onChange: e => setConfig({
      ...config,
      topP: parseFloat(e.target.value)
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Nucleus sampling threshold")), config.provider !== "ollama" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "API Key"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "password",
    value: config.apiKey || "",
    onChange: e => setConfig({
      ...config,
      apiKey: e.target.value
    }),
    placeholder: "Enter API key..."
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "cancel-btn",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `save-btn ${saveStatus}`,
    onClick: saveConfig,
    disabled: saveStatus === "saving"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Save, {
    size: 16
  }), saveStatus === "idle" && "Save Changes", saveStatus === "saving" && "Saving...", saveStatus === "success" && "Saved!", saveStatus === "error" && "Error!"))));
}

/***/ }),

/***/ "../agentic_chat/src/PoliciesConfig.tsx":
/*!**********************************************!*\
  !*** ../agentic_chat/src/PoliciesConfig.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PoliciesConfig; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _ConfigModal_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigModal.css */ "../agentic_chat/src/ConfigModal.css");
// eslint-disable-next-line @typescript-eslint/no-unused-vars



function MultiSelect({
  items,
  selectedValues,
  onChange,
  placeholder,
  disabled,
  allowWildcard
}) {
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const filteredItems = items.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()) || item.description?.toLowerCase().includes(searchTerm.toLowerCase()));
  const hasWildcard = selectedValues.includes("*");
  const toggleItem = value => {
    if (value === "*") {
      onChange(hasWildcard ? [] : ["*"]);
    } else {
      if (hasWildcard) {
        onChange([value]);
      } else {
        const newValues = selectedValues.includes(value) ? selectedValues.filter(v => v !== value) : [...selectedValues, value];
        onChange(newValues);
      }
    }
  };
  const displayText = hasWildcard ? "All (*)" : selectedValues.length === 0 ? placeholder || "Select..." : `${selectedValues.length} selected`;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: dropdownRef,
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    onClick: () => !disabled && setIsOpen(!isOpen),
    style: {
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      cursor: disabled ? "not-allowed" : "pointer",
      backgroundColor: disabled ? "#f9fafb" : "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    style: {
      color: selectedValues.length === 0 ? "#9ca3af" : "#111827"
    }
  }, displayText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronDown, {
    size: 16,
    style: {
      transform: isOpen ? "rotate(180deg)" : "none",
      transition: "transform 0.2s"
    }
  })), isOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      marginTop: "4px",
      backgroundColor: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      maxHeight: "300px",
      overflow: "hidden",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      padding: "8px",
      borderBottom: "1px solid #e5e7eb"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Search, {
    size: 16,
    style: {
      position: "absolute",
      left: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    placeholder: "Search...",
    style: {
      width: "100%",
      padding: "6px 6px 6px 32px",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      fontSize: "13px"
    },
    onClick: e => e.stopPropagation()
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      overflowY: "auto",
      maxHeight: "240px"
    }
  }, allowWildcard && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    onClick: () => toggleItem("*"),
    style: {
      padding: "8px 12px",
      cursor: "pointer",
      backgroundColor: hasWildcard ? "#eff6ff" : "transparent",
      borderBottom: "1px solid #f3f4f6",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: hasWildcard,
    readOnly: true,
    style: {
      cursor: "pointer"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: "13px"
    }
  }, "All (*)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontSize: "12px",
      color: "#6b7280"
    }
  }, "Select all items"))), filteredItems.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: item.value,
    onClick: () => toggleItem(item.value),
    style: {
      padding: "8px 12px",
      cursor: "pointer",
      backgroundColor: selectedValues.includes(item.value) ? "#eff6ff" : "transparent",
      borderBottom: "1px solid #f3f4f6",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: selectedValues.includes(item.value),
    readOnly: true,
    style: {
      cursor: "pointer"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontWeight: 500,
      fontSize: "13px"
    }
  }, item.label), item.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      fontSize: "12px",
      color: "#6b7280",
      marginTop: "2px"
    }
  }, item.description)))), filteredItems.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      padding: "16px",
      textAlign: "center",
      color: "#9ca3af",
      fontSize: "13px"
    }
  }, "No items found"))));
}
function TagInput({
  values,
  onChange,
  placeholder,
  disabled
}) {
  const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const addTag = tag => {
    const trimmed = tag.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInputValue("");
  };
  const removeTag = index => {
    onChange(values.filter((_, i) => i !== index));
  };
  const handleKeyDown = e => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && values.length > 0) {
      removeTag(values.length - 1);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    onClick: () => !disabled && inputRef.current?.focus(),
    style: {
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      padding: "6px",
      minHeight: "42px",
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      alignItems: "center",
      cursor: disabled ? "not-allowed" : "text",
      backgroundColor: disabled ? "#f9fafb" : "#fff"
    }
  }, values.map((tag, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      padding: "4px 8px",
      backgroundColor: "#eff6ff",
      border: "1px solid #dbeafe",
      borderRadius: "4px",
      fontSize: "13px",
      color: "#1e40af"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, tag), !disabled && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: e => {
      e.stopPropagation();
      removeTag(index);
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "0",
      display: "flex",
      alignItems: "center",
      color: "#3b82f6",
      fontSize: "16px",
      lineHeight: "1"
    },
    title: "Remove"
  }, "\xD7"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    ref: inputRef,
    type: "text",
    value: inputValue,
    onChange: e => setInputValue(e.target.value),
    onKeyDown: handleKeyDown,
    onBlur: () => {
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    },
    placeholder: values.length === 0 ? placeholder : "",
    disabled: disabled,
    style: {
      border: "none",
      outline: "none",
      flex: 1,
      minWidth: "120px",
      padding: "4px",
      fontSize: "13px",
      backgroundColor: "transparent"
    }
  }));
}
function PoliciesConfig({
  onClose
}) {
  const [config, setConfig] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    enablePolicies: true,
    policies: []
  });
  const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("intent_guard");
  const [expandedPolicy, setExpandedPolicy] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [saveStatus, setSaveStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("idle");
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [availableTools, setAvailableTools] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [availableApps, setAvailableApps] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [toolsLoading, setToolsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadConfig();
    loadTools();
  }, []);
  const loadConfig = async () => {
    setIsLoading(true);
    try {
      console.log("[PoliciesConfig] Loading policies from server...");
      const response = await fetch("/api/config/policies");
      console.log("[PoliciesConfig] Response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("[PoliciesConfig] Loaded policies:", data);

        // Normalize natural_language trigger values to always be arrays (for backward compatibility)
        const normalizedPolicies = (data.policies ?? []).map(policy => ({
          ...policy,
          triggers: policy.triggers.map(trigger => {
            if (trigger.type === "natural_language" && trigger.value !== undefined) {
              // Ensure value is always an array for natural_language triggers
              const normalizedValue = Array.isArray(trigger.value) ? trigger.value : typeof trigger.value === "string" ? [trigger.value] : [];
              return {
                ...trigger,
                value: normalizedValue
              };
            }
            return trigger;
          })
        }));
        setConfig({
          enablePolicies: data.enablePolicies ?? true,
          policies: normalizedPolicies
        });
      } else {
        const errorText = await response.text();
        console.error("[PoliciesConfig] Failed to load policies:", response.status, errorText);
      }
    } catch (error) {
      console.error("[PoliciesConfig] Error loading config:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadTools = async () => {
    setToolsLoading(true);
    try {
      console.log("[PoliciesConfig] Loading tools from server...");
      const response = await fetch("/api/tools/list");
      if (response.ok) {
        const data = await response.json();
        console.log("[PoliciesConfig] Loaded tools:", data);
        setAvailableTools(data.tools || []);
        setAvailableApps(data.apps || []);
      } else {
        console.error("[PoliciesConfig] Failed to load tools:", response.status);
      }
    } catch (error) {
      console.error("[PoliciesConfig] Error loading tools:", error);
    } finally {
      setToolsLoading(false);
    }
  };
  const exportPolicies = () => {
    try {
      const dataStr = JSON.stringify(config, null, 2);
      const dataBlob = new Blob([dataStr], {
        type: "application/json"
      });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `policies-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log("[PoliciesConfig] Exported policies:", config.policies.length);
    } catch (error) {
      console.error("[PoliciesConfig] Export error:", error);
      alert("Failed to export policies. Check console for details.");
    }
  };
  const importPolicies = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const importedData = JSON.parse(e.target?.result);
        if (importedData.policies && Array.isArray(importedData.policies)) {
          // Normalize natural_language trigger values to always be arrays (for backward compatibility)
          const normalizedPolicies = importedData.policies.map(policy => ({
            ...policy,
            triggers: policy.triggers.map(trigger => {
              if (trigger.type === "natural_language" && trigger.value !== undefined) {
                // Ensure value is always an array for natural_language triggers
                const normalizedValue = Array.isArray(trigger.value) ? trigger.value : typeof trigger.value === "string" ? [trigger.value] : [];
                return {
                  ...trigger,
                  value: normalizedValue
                };
              }
              return trigger;
            })
          }));
          setConfig({
            enablePolicies: importedData.enablePolicies ?? config.enablePolicies,
            policies: normalizedPolicies
          });
          console.log("[PoliciesConfig] Imported policies:", normalizedPolicies.length);
          alert(`Successfully imported ${normalizedPolicies.length} policies!`);
        } else {
          alert('Invalid policies file format. Expected a JSON file with a "policies" array.');
        }
      } catch (error) {
        console.error("[PoliciesConfig] Import error:", error);
        alert("Failed to import policies. Please check the file format.");
      }
    };
    reader.readAsText(file);
    // Reset input so the same file can be imported again
    event.target.value = "";
  };
  const saveConfig = async () => {
    // Force blur on any focused input to ensure pending changes are saved
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Small delay to ensure blur event handlers complete
    await new Promise(resolve => setTimeout(resolve, 50));
    setSaveStatus("saving");
    try {
      // Normalize natural_language trigger values to always be arrays
      const normalizedConfig = {
        ...config,
        policies: config.policies.map(policy => ({
          ...policy,
          triggers: policy.triggers.map(trigger => {
            if (trigger.type === "natural_language" && trigger.value !== undefined) {
              // Ensure value is always an array for natural_language triggers
              const normalizedValue = Array.isArray(trigger.value) ? trigger.value : typeof trigger.value === "string" ? [trigger.value] : [];
              return {
                ...trigger,
                value: normalizedValue
              };
            }
            return trigger;
          })
        }))
      };
      console.log("[PoliciesConfig] Saving config:", normalizedConfig);
      console.log("[PoliciesConfig] Policies count:", normalizedConfig.policies.length);
      normalizedConfig.policies.forEach((policy, idx) => {
        console.log(`[PoliciesConfig] Policy ${idx}: ${policy.name}`);
        console.log(`[PoliciesConfig] Policy ${idx} triggers:`, policy.triggers);
        // Log keyword trigger operators specifically
        policy.triggers.forEach((trigger, triggerIdx) => {
          if (trigger.type === "keyword") {
            console.log(`[PoliciesConfig] Policy ${idx} trigger ${triggerIdx}: type=keyword, operator=${trigger.operator || "MISSING"}, keywords=${JSON.stringify(trigger.value)}`);
          } else if (trigger.type === "natural_language") {
            console.log(`[PoliciesConfig] Policy ${idx} trigger ${triggerIdx}: type=natural_language, values=${JSON.stringify(trigger.value)}`);
          }
        });
      });
      const response = await fetch("/api/config/policies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(normalizedConfig)
      });
      console.log("[PoliciesConfig] Response status:", response.status);
      if (response.ok) {
        const result = await response.json();
        console.log("[PoliciesConfig] Save successful:", result);
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        const errorText = await response.text();
        console.error("[PoliciesConfig] Save failed:", response.status, errorText);
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    } catch (error) {
      console.error("[PoliciesConfig] Save error:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };
  const addIntentGuard = () => {
    const newPolicy = {
      id: `guard_${Date.now()}`,
      name: "New Intent Guard",
      description: "Blocks or modifies specific user intents",
      policy_type: "intent_guard",
      enabled: true,
      triggers: [{
        type: "keyword",
        value: [],
        target: "intent",
        case_sensitive: false,
        operator: "and"
      }],
      response: {
        response_type: "natural_language",
        content: "This action is not allowed."
      },
      allow_override: false,
      priority: 50
    };
    setConfig({
      ...config,
      policies: [...config.policies, newPolicy]
    });
  };
  const addPlaybook = () => {
    const newPolicy = {
      id: `playbook_${Date.now()}`,
      name: "New Playbook",
      description: "Step-by-step guidance for a task",
      policy_type: "playbook",
      enabled: true,
      triggers: [{
        type: "keyword",
        value: [],
        target: "intent",
        case_sensitive: false,
        operator: "and"
      }],
      markdown_content: "# Task Guide\n\n## Steps:\n\n1. First step\n2. Second step\n3. Third step",
      steps: [{
        step_number: 1,
        instruction: "First step",
        expected_outcome: "Step 1 complete",
        tools_allowed: []
      }],
      priority: 50
    };
    setConfig({
      ...config,
      policies: [...config.policies, newPolicy]
    });
  };
  const addToolGuide = () => {
    const newPolicy = {
      id: `tool_guide_${Date.now()}`,
      name: "New Tool Guide",
      description: "Add additional context to tool descriptions",
      policy_type: "tool_guide",
      enabled: true,
      triggers: [{
        type: "always"
      }],
      target_tools: ["*"],
      target_apps: undefined,
      guide_content: "## Additional Guidelines\n\n- Follow best practices\n- Consider security implications",
      prepend: false,
      priority: 50
    };
    setConfig({
      ...config,
      policies: [...config.policies, newPolicy]
    });
  };
  const addToolApproval = () => {
    const newPolicy = {
      id: `tool_approval_${Date.now()}`,
      name: "New Tool Approval",
      description: "Require approval before executing specific tools",
      policy_type: "tool_approval",
      enabled: true,
      triggers: [],
      // ToolApproval policies don't use triggers - they're checked after code generation
      required_tools: [],
      required_apps: undefined,
      approval_message: "This tool requires your approval before execution.",
      show_code_preview: true,
      auto_approve_after: undefined,
      priority: 50
    };
    setConfig({
      ...config,
      policies: [...config.policies, newPolicy]
    });
  };
  const addOutputFormatter = () => {
    const newPolicy = {
      id: `output_formatter_${Date.now()}`,
      name: "New Output Formatter",
      description: "Format the final AI message output",
      policy_type: "output_formatter",
      enabled: true,
      triggers: [{
        type: "keyword",
        value: [],
        target: "agent_response",
        case_sensitive: false,
        operator: "and"
      }],
      format_type: "markdown",
      format_config: "Format the response in a clear, structured way with proper headings and bullet points.",
      priority: 50
    };
    setConfig({
      ...config,
      policies: [...config.policies, newPolicy]
    });
  };
  const updatePolicy = (id, updates) => {
    setConfig({
      ...config,
      policies: config.policies.map(policy => policy.id === id ? {
        ...policy,
        ...updates
      } : policy)
    });
  };
  const removePolicy = id => {
    setConfig({
      ...config,
      policies: config.policies.filter(p => p.id !== id)
    });
  };
  const intentGuards = config.policies.filter(p => p.policy_type === "intent_guard");
  const playbooks = config.policies.filter(p => p.policy_type === "playbook");
  const ToolGuides = config.policies.filter(p => p.policy_type === "tool_guide");
  const toolApprovals = config.policies.filter(p => p.policy_type === "tool_approval");
  const outputFormatters = config.policies.filter(p => p.policy_type === "output_formatter");
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-overlay"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Shield, {
    size: 24,
    style: {
      color: "#4e00ec"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Policies Configuration")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: exportPolicies,
    disabled: config.policies.length === 0,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      backgroundColor: config.policies.length === 0 ? "#e5e7eb" : "#f3f4f6",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      cursor: config.policies.length === 0 ? "not-allowed" : "pointer",
      fontSize: "13px",
      fontWeight: 500,
      color: config.policies.length === 0 ? "#9ca3af" : "#374151"
    },
    title: "Export all policies as JSON"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Download, {
    size: 16
  }), "Export"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      backgroundColor: "#f3f4f6",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 500,
      color: "#374151"
    },
    title: "Import policies from JSON"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Upload, {
    size: 16
  }), "Import", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "file",
    accept: ".json",
    onChange: importPolicies,
    style: {
      display: "none"
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "config-modal-close",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.X, {
    size: 20
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-tabs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `config-tab ${activeTab === "intent_guard" ? "active" : ""}`,
    onClick: () => setActiveTab("intent_guard")
  }, "Intent Guards (", intentGuards.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `config-tab ${activeTab === "playbook" ? "active" : ""}`,
    onClick: () => setActiveTab("playbook")
  }, "Playbooks (", playbooks.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `config-tab ${activeTab === "tool_guide" ? "active" : ""}`,
    onClick: () => setActiveTab("tool_guide")
  }, "Tool Guide (", ToolGuides.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `config-tab ${activeTab === "tool_approval" ? "active" : ""}`,
    onClick: () => setActiveTab("tool_approval")
  }, "Tool Approval (", toolApprovals.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `config-tab ${activeTab === "output_formatter" ? "active" : ""}`,
    onClick: () => setActiveTab("output_formatter")
  }, "Output Formatter (", outputFormatters.length, ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-content"
  }, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card",
    style: {
      textAlign: "center",
      padding: "40px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Loading policies...")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Global Settings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "checkbox-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: config.enablePolicies,
    onChange: e => setConfig({
      ...config,
      enablePolicies: e.target.checked
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Enable Policy System")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Master switch for all policy enforcement (", config.policies.length, " policies configured)")))), activeTab === "intent_guard" && renderIntentGuards(), activeTab === "playbook" && renderPlaybooks(), activeTab === "tool_guide" && renderToolGuides(), activeTab === "tool_approval" && renderToolApprovals(), activeTab === "output_formatter" && renderOutputFormatters())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "config-modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "cancel-btn",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: `save-btn ${saveStatus}`,
    onClick: saveConfig,
    disabled: saveStatus === "saving"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Save, {
    size: 16
  }), saveStatus === "idle" && "Save Changes", saveStatus === "saving" && "Saving...", saveStatus === "success" && "Saved!", saveStatus === "error" && "Error!"))));
  function renderIntentGuards() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "config-card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "section-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Intent Guards"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "add-btn",
      onClick: addIntentGuard,
      disabled: !config.enablePolicies
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
      size: 16
    }), "Add Intent Guard")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sources-list"
    }, intentGuards.map(policy => {
      const isExpanded = expandedPolicy === policy.id;
      const keywordTrigger = policy.triggers.find(t => t.type === "keyword");
      const keywords = keywordTrigger && Array.isArray(keywordTrigger.value) ? keywordTrigger.value : [];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: policy.id,
        className: "agent-config-card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-top"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "checkbox",
        checked: policy.enabled,
        onChange: e => updatePolicy(policy.id, {
          enabled: e.target.checked
        }),
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "text",
        value: policy.name,
        onChange: e => updatePolicy(policy.id, {
          name: e.target.value
        }),
        className: "agent-config-name",
        placeholder: "Policy Name",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "expand-btn",
        onClick: () => setExpandedPolicy(isExpanded ? null : policy.id)
      }, isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronUp, {
        size: 16
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronDown, {
        size: 16
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "delete-btn",
        onClick: () => removePolicy(policy.id),
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
        size: 16
      }))), !isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-summary"
      }, keywords.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, keywords.length, " keyword", keywords.length !== 1 ? "s" : ""), policy.triggers.some(t => t.type === "natural_language") && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, "AI trigger"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, "Priority: ", policy.priority))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-details"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.description,
        onChange: e => updatePolicy(policy.id, {
          description: e.target.value
        }),
        placeholder: "What this policy does...",
        rows: 2,
        disabled: !config.enablePolicies
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Trigger Keywords (Optional)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TagInput, {
        values: keywords,
        onChange: newKeywords => {
          const updatedTriggers = policy.triggers.filter(t => t.type !== "keyword");
          if (newKeywords.length > 0) {
            const existingKeywordTrigger = policy.triggers.find(t => t.type === "keyword");
            updatedTriggers.push({
              type: "keyword",
              value: newKeywords,
              target: "intent",
              case_sensitive: false,
              operator: existingKeywordTrigger?.operator || "and"
            });
          }
          updatePolicy(policy.id, {
            triggers: updatedTriggers
          });
        },
        placeholder: "Type keyword and press Enter or comma",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Type keywords and press Enter or comma to add. Click \xD7 to remove.")), keywords.length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Keyword Matching"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
        value: keywordTrigger?.operator || "and",
        onChange: e => {
          const operator = e.target.value;
          const updatedTriggers = policy.triggers.map(t => t.type === "keyword" ? {
            ...t,
            operator
          } : t);
          updatePolicy(policy.id, {
            triggers: updatedTriggers
          });
        },
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "and"
      }, "Match ALL keywords (AND)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "or"
      }, "Match ANY keyword (OR)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Choose whether all keywords or any keyword should trigger this policy")), (() => {
        const nlTrigger = policy.triggers.find(t => t.type === "natural_language");
        const nlTriggerValues = nlTrigger ? Array.isArray(nlTrigger.value) ? nlTrigger.value : nlTrigger.value ? [nlTrigger.value] : [] : [];
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "form-group"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Natural Language Triggers"), nlTrigger ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TagInput, {
          values: nlTriggerValues,
          onChange: newValues => {
            const updatedTriggers = policy.triggers.map(t => t.type === "natural_language" ? {
              ...t,
              value: newValues
            } : t);
            updatePolicy(policy.id, {
              triggers: updatedTriggers
            });
          },
          placeholder: "Type natural language trigger and press Enter",
          disabled: !config.enablePolicies
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "form-group",
          style: {
            marginTop: "12px"
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Similarity Threshold"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "range",
          min: "0.5",
          max: "1.0",
          step: "0.05",
          value: nlTrigger.threshold || 0.7,
          onChange: e => {
            const updatedTriggers = policy.triggers.map(t => t.type === "natural_language" ? {
              ...t,
              threshold: parseFloat(e.target.value)
            } : t);
            updatePolicy(policy.id, {
              triggers: updatedTriggers
            });
          },
          disabled: !config.enablePolicies
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Threshold: ", (nlTrigger.threshold || 0.7).toFixed(2), " (higher = more strict matching)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: () => {
            const updatedTriggers = policy.triggers.filter(t => t.type !== "natural_language");
            updatePolicy(policy.id, {
              triggers: updatedTriggers
            });
          },
          disabled: !config.enablePolicies,
          style: {
            marginTop: "8px",
            padding: "6px 12px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: config.enablePolicies ? "pointer" : "not-allowed",
            fontSize: "12px"
          }
        }, "Remove Natural Language Trigger")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: () => {
            const newTrigger = {
              type: "natural_language",
              value: [],
              target: "intent",
              threshold: 0.7
            };
            updatePolicy(policy.id, {
              triggers: [...policy.triggers, newTrigger]
            });
          },
          disabled: !config.enablePolicies,
          style: {
            padding: "6px 12px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: config.enablePolicies ? "pointer" : "not-allowed",
            fontSize: "13px"
          }
        }, "+ Add Natural Language Trigger"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Type natural language triggers and press Enter to add. AI will match similar intents using semantic understanding."));
      })(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Response Message"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.response.content,
        onChange: e => updatePolicy(policy.id, {
          response: {
            ...policy.response,
            content: e.target.value
          }
        }),
        placeholder: "This action is not allowed.",
        rows: 3,
        disabled: !config.enablePolicies
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Priority"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "number",
        value: policy.priority,
        onChange: e => updatePolicy(policy.id, {
          priority: parseInt(e.target.value)
        }),
        min: "0",
        max: "100",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Higher priority policies are checked first")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
        className: "checkbox-label"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "checkbox",
        checked: policy.allow_override,
        onChange: e => updatePolicy(policy.id, {
          allow_override: e.target.checked
        }),
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Allow Override")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "User can bypass this policy")))));
    })), intentGuards.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "empty-state"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No intent guards configured. Click \"Add Intent Guard\" to create one.")));
  }
  function renderPlaybooks() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "config-card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "section-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Playbooks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "add-btn",
      onClick: addPlaybook,
      disabled: !config.enablePolicies
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
      size: 16
    }), "Add Playbook")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sources-list"
    }, playbooks.map(policy => {
      const isExpanded = expandedPolicy === policy.id;
      const keywordTrigger = policy.triggers.find(t => t.type === "keyword");
      const keywords = keywordTrigger && Array.isArray(keywordTrigger.value) ? keywordTrigger.value : [];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: policy.id,
        className: "agent-config-card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-top"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "checkbox",
        checked: policy.enabled,
        onChange: e => updatePolicy(policy.id, {
          enabled: e.target.checked
        }),
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "text",
        value: policy.name,
        onChange: e => updatePolicy(policy.id, {
          name: e.target.value
        }),
        className: "agent-config-name",
        placeholder: "Playbook Name",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "expand-btn",
        onClick: () => setExpandedPolicy(isExpanded ? null : policy.id)
      }, isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronUp, {
        size: 16
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronDown, {
        size: 16
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "delete-btn",
        onClick: () => removePolicy(policy.id),
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
        size: 16
      }))), !isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-summary"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, policy.steps.length, " step", policy.steps.length !== 1 ? "s" : ""), policy.triggers.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, policy.triggers[0].type === "natural_language" ? "AI trigger" : `${keywords.length} keyword${keywords.length !== 1 ? "s" : ""}`))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-details"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.description,
        onChange: e => updatePolicy(policy.id, {
          description: e.target.value
        }),
        placeholder: "What this playbook guides the user through...",
        rows: 2,
        disabled: !config.enablePolicies
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Trigger Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
        value: policy.triggers.length > 0 && policy.triggers[0].type === "natural_language" ? "natural_language" : "keyword",
        onChange: e => {
          const triggerType = e.target.value;
          if (triggerType === "natural_language") {
            updatePolicy(policy.id, {
              triggers: [{
                type: "natural_language",
                value: [],
                target: "intent",
                threshold: 0.7
              }]
            });
          } else {
            updatePolicy(policy.id, {
              triggers: [{
                type: "keyword",
                value: [],
                target: "intent",
                case_sensitive: false,
                operator: "and"
              }]
            });
          }
        },
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "keyword"
      }, "Keywords (Exact Match)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "natural_language"
      }, "Natural Language (AI Match)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Choose how this playbook should be triggered")), policy.triggers.length > 0 && policy.triggers[0].type === "keyword" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Trigger Keywords"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TagInput, {
        values: keywords,
        onChange: newKeywords => {
          const newTriggers = policy.triggers.map(t => t.type === "keyword" ? {
            ...t,
            value: newKeywords
          } : t);
          updatePolicy(policy.id, {
            triggers: newTriggers
          });
        },
        placeholder: "Type keyword and press Enter or comma",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Type keywords and press Enter or comma to add. Click \xD7 to remove.")), keywords.length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Keyword Matching"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
        value: keywordTrigger?.operator || "and",
        onChange: e => {
          const operator = e.target.value;
          const newTriggers = policy.triggers.map(t => t.type === "keyword" ? {
            ...t,
            operator
          } : t);
          updatePolicy(policy.id, {
            triggers: newTriggers
          });
        },
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "and"
      }, "Match ALL keywords (AND)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "or"
      }, "Match ANY keyword (OR)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Choose whether all keywords or any keyword should trigger this playbook"))), policy.triggers.length > 0 && policy.triggers[0].type === "natural_language" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Natural Language Triggers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TagInput, {
        values: Array.isArray(policy.triggers[0].value) ? policy.triggers[0].value : policy.triggers[0].value ? [policy.triggers[0].value] : [],
        onChange: newTriggers => {
          const updatedTriggers = policy.triggers.map((t, idx) => idx === 0 ? {
            ...t,
            value: newTriggers
          } : t);
          updatePolicy(policy.id, {
            triggers: updatedTriggers
          });
        },
        placeholder: "Type trigger and press Enter",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Type natural language triggers and press Enter to add. AI will match similar user requests.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Similarity Threshold"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "range",
        min: "0.5",
        max: "1.0",
        step: "0.05",
        value: policy.triggers[0].threshold || 0.7,
        onChange: e => {
          const newTriggers = policy.triggers.map((t, idx) => idx === 0 ? {
            ...t,
            threshold: parseFloat(e.target.value)
          } : t);
          updatePolicy(policy.id, {
            triggers: newTriggers
          });
        },
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Threshold: ", (policy.triggers[0].threshold || 0.7).toFixed(2), " (higher = more strict matching)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Markdown Content"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.markdown_content,
        onChange: e => updatePolicy(policy.id, {
          markdown_content: e.target.value
        }),
        placeholder: "# Task Guide ## Steps: 1. First step\n2. Second step",
        rows: 8,
        disabled: !config.enablePolicies,
        style: {
          fontFamily: "monospace",
          fontSize: "13px"
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Markdown-formatted guidance that will be shown to the agent")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Priority"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "number",
        value: policy.priority,
        onChange: e => updatePolicy(policy.id, {
          priority: parseInt(e.target.value)
        }),
        min: "0",
        max: "100",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Higher priority playbooks are checked first"))));
    })), playbooks.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "empty-state"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No playbooks configured. Click \"Add Playbook\" to create one.")));
  }
  function renderToolGuides() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "config-card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "section-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Tool Guide Policies"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "add-btn",
      onClick: addToolGuide,
      disabled: !config.enablePolicies
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
      size: 16
    }), "Add Tool Guide")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sources-list"
    }, ToolGuides.map(policy => {
      const isExpanded = expandedPolicy === policy.id;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: policy.id,
        className: "agent-config-card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-top"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "checkbox",
        checked: policy.enabled,
        onChange: e => updatePolicy(policy.id, {
          enabled: e.target.checked
        }),
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "text",
        value: policy.name,
        onChange: e => updatePolicy(policy.id, {
          name: e.target.value
        }),
        className: "agent-config-name",
        placeholder: "Policy Name",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "expand-btn",
        onClick: () => setExpandedPolicy(isExpanded ? null : policy.id)
      }, isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronUp, {
        size: 16
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronDown, {
        size: 16
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "delete-btn",
        onClick: () => removePolicy(policy.id),
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
        size: 16
      }))), !isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-summary"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, policy.target_tools.includes("*") ? "All tools" : `${policy.target_tools.length} tool(s)`), policy.target_apps && policy.target_apps.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, policy.target_apps.length, " app(s)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, "Priority: ", policy.priority))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-details"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.description,
        onChange: e => updatePolicy(policy.id, {
          description: e.target.value
        }),
        rows: 2,
        disabled: !config.enablePolicies
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Target Tools"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MultiSelect, {
        items: availableTools.map(tool => ({
          value: tool.name,
          label: tool.name,
          description: `${tool.app} - ${tool.description.substring(0, 60)}${tool.description.length > 60 ? "..." : ""}`
        })),
        selectedValues: policy.target_tools,
        onChange: values => updatePolicy(policy.id, {
          target_tools: values
        }),
        placeholder: toolsLoading ? "Loading tools..." : "Select tools to enrich",
        disabled: !config.enablePolicies || toolsLoading,
        allowWildcard: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Select specific tools to enrich, or use * to enrich all tools")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Target Apps (optional)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MultiSelect, {
        items: availableApps.map(app => ({
          value: app.name,
          label: app.name,
          description: `${app.type} - ${app.tool_count} tool(s)`
        })),
        selectedValues: policy.target_apps || [],
        onChange: values => updatePolicy(policy.id, {
          target_apps: values.length > 0 ? values : undefined
        }),
        placeholder: toolsLoading ? "Loading apps..." : "Select apps (optional)",
        disabled: !config.enablePolicies || toolsLoading,
        allowWildcard: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Optionally filter by app name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Guide Content (Markdown)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.guide_content,
        onChange: e => updatePolicy(policy.id, {
          guide_content: e.target.value
        }),
        placeholder: "## Additional Guidelines - Follow best practices\n- Consider security",
        rows: 6,
        disabled: !config.enablePolicies,
        style: {
          fontFamily: "monospace",
          fontSize: "13px"
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Markdown content to add to tool descriptions")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "checkbox",
        checked: policy.prepend,
        onChange: e => updatePolicy(policy.id, {
          prepend: e.target.checked
        }),
        disabled: !config.enablePolicies
      }), "Prepend content (add before existing description)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Priority"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "number",
        value: policy.priority,
        onChange: e => updatePolicy(policy.id, {
          priority: parseInt(e.target.value)
        }),
        min: "0",
        max: "100",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Higher priority guides are applied first"))));
    })), ToolGuides.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "empty-state"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No tool guide policies configured. Click \"Add Tool Guide\" to create one.")));
  }
  function renderToolApprovals() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "config-card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "section-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Tool Approval Policies"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "add-btn",
      onClick: addToolApproval,
      disabled: !config.enablePolicies
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
      size: 16
    }), "Add Tool Approval")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "policies-list"
    }, toolApprovals.map(policy => {
      const isExpanded = expandedPolicy === policy.id;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: policy.id,
        className: "agent-config-card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-top"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "checkbox",
        checked: policy.enabled,
        onChange: e => updatePolicy(policy.id, {
          enabled: e.target.checked
        }),
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "text",
        value: policy.name,
        onChange: e => updatePolicy(policy.id, {
          name: e.target.value
        }),
        className: "agent-config-name",
        placeholder: "Policy Name",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "expand-btn",
        onClick: () => setExpandedPolicy(isExpanded ? null : policy.id)
      }, isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronUp, {
        size: 16
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronDown, {
        size: 16
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "delete-btn",
        onClick: () => removePolicy(policy.id),
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
        size: 16
      }))), !isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-summary"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, policy.required_tools.length === 0 ? "No tools selected" : policy.required_tools.includes("*") ? "All tools" : `${policy.required_tools.length} tool(s)`), policy.required_apps && policy.required_apps.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, policy.required_apps.length, " app(s)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, "Priority: ", policy.priority))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-details"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.description,
        onChange: e => updatePolicy(policy.id, {
          description: e.target.value
        }),
        rows: 2,
        disabled: !config.enablePolicies
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Required Tools"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MultiSelect, {
        items: availableTools.map(tool => ({
          value: tool.name,
          label: tool.name,
          description: `${tool.app} - ${tool.description.substring(0, 60)}${tool.description.length > 60 ? "..." : ""}`
        })),
        selectedValues: policy.required_tools,
        onChange: values => updatePolicy(policy.id, {
          required_tools: values
        }),
        placeholder: toolsLoading ? "Loading tools..." : "Select tools requiring approval",
        disabled: !config.enablePolicies || toolsLoading,
        allowWildcard: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Tools that require approval before execution")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Required Apps (optional)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MultiSelect, {
        items: availableApps.map(app => ({
          value: app.name,
          label: app.name,
          description: `${app.type} - ${app.tool_count} tool(s)`
        })),
        selectedValues: policy.required_apps || [],
        onChange: values => updatePolicy(policy.id, {
          required_apps: values.length > 0 ? values : undefined
        }),
        placeholder: toolsLoading ? "Loading apps..." : "Select apps (optional)",
        disabled: !config.enablePolicies || toolsLoading,
        allowWildcard: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Optionally require approval for all tools from specific apps")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Approval Message (optional)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.approval_message || "",
        onChange: e => updatePolicy(policy.id, {
          approval_message: e.target.value || undefined
        }),
        placeholder: "This tool requires your approval before execution.",
        rows: 3,
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Custom message shown when requesting approval")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "checkbox",
        checked: policy.show_code_preview,
        onChange: e => updatePolicy(policy.id, {
          show_code_preview: e.target.checked
        }),
        disabled: !config.enablePolicies
      }), "Show code preview in approval request")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Auto-approve after (seconds, optional)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "number",
        value: policy.auto_approve_after || "",
        onChange: e => {
          const value = e.target.value ? parseInt(e.target.value) : undefined;
          updatePolicy(policy.id, {
            auto_approve_after: value
          });
        },
        min: "1",
        placeholder: "Leave empty for no auto-approve",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Automatically approve after N seconds (leave empty to disable)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Priority"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "number",
        value: policy.priority,
        onChange: e => updatePolicy(policy.id, {
          priority: parseInt(e.target.value)
        }),
        min: "0",
        max: "100",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Higher priority approval policies are checked first"))));
    })), toolApprovals.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "empty-state"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No tool approval policies configured. Click \"Add Tool Approval\" to create one.")));
  }
  function renderOutputFormatters() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "config-card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "section-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Output Formatter Policies"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "add-btn",
      onClick: addOutputFormatter,
      disabled: !config.enablePolicies
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Plus, {
      size: 16
    }), "Add Output Formatter")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "policies-list"
    }, outputFormatters.map(policy => {
      const isExpanded = expandedPolicy === policy.id;
      const keywordTrigger = policy.triggers.find(t => t.type === "keyword");
      const keywords = keywordTrigger && Array.isArray(keywordTrigger.value) ? keywordTrigger.value : [];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: policy.id,
        className: "agent-config-card"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-top"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "checkbox",
        checked: policy.enabled,
        onChange: e => updatePolicy(policy.id, {
          enabled: e.target.checked
        }),
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "text",
        value: policy.name,
        onChange: e => updatePolicy(policy.id, {
          name: e.target.value
        }),
        className: "agent-config-name",
        placeholder: "Policy Name",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "expand-btn",
        onClick: () => setExpandedPolicy(isExpanded ? null : policy.id)
      }, isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronUp, {
        size: 16
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.ChevronDown, {
        size: 16
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
        className: "delete-btn",
        onClick: () => removePolicy(policy.id),
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Trash2, {
        size: 16
      }))), !isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-summary"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, policy.format_type === "direct" ? "Direct" : policy.format_type === "markdown" ? "Markdown (LLM)" : "JSON (LLM)"), keywords.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, keywords.length, " keyword", keywords.length !== 1 ? "s" : ""), policy.triggers.some(t => t.type === "natural_language") && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, "AI trigger"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "agent-summary-item"
      }, "Priority: ", policy.priority))), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "agent-config-details"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.description,
        onChange: e => updatePolicy(policy.id, {
          description: e.target.value
        }),
        rows: 2,
        disabled: !config.enablePolicies
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Trigger Keywords (Optional)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TagInput, {
        values: keywords,
        onChange: newKeywords => {
          const updatedTriggers = policy.triggers.filter(t => t.type !== "keyword");
          if (newKeywords.length > 0) {
            const existingKeywordTrigger = policy.triggers.find(t => t.type === "keyword");
            updatedTriggers.push({
              type: "keyword",
              value: newKeywords,
              target: "agent_response",
              case_sensitive: false,
              operator: existingKeywordTrigger?.operator || "and"
            });
          }
          updatePolicy(policy.id, {
            triggers: updatedTriggers
          });
        },
        placeholder: "Type keyword and press Enter or comma",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Keywords to match against the last AI message content. Leave empty to always format.")), keywords.length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Keyword Matching"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
        value: keywordTrigger?.operator || "and",
        onChange: e => {
          const operator = e.target.value;
          const updatedTriggers = policy.triggers.map(t => t.type === "keyword" ? {
            ...t,
            operator
          } : t);
          updatePolicy(policy.id, {
            triggers: updatedTriggers
          });
        },
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "and"
      }, "Match ALL keywords (AND)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "or"
      }, "Match ANY keyword (OR)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Choose whether all keywords or any keyword should trigger this formatter")), (() => {
        const nlTrigger = policy.triggers.find(t => t.type === "natural_language");
        const nlTriggerValues = nlTrigger ? Array.isArray(nlTrigger.value) ? nlTrigger.value : nlTrigger.value ? [nlTrigger.value] : [] : [];
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "form-group"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Natural Language Triggers"), nlTrigger ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TagInput, {
          values: nlTriggerValues,
          onChange: newValues => {
            const updatedTriggers = policy.triggers.map(t => t.type === "natural_language" ? {
              ...t,
              value: newValues
            } : t);
            updatePolicy(policy.id, {
              triggers: updatedTriggers
            });
          },
          placeholder: "Type natural language trigger and press Enter",
          disabled: !config.enablePolicies
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
          className: "form-group",
          style: {
            marginTop: "12px"
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Similarity Threshold"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
          type: "range",
          min: "0.5",
          max: "1.0",
          step: "0.05",
          value: nlTrigger.threshold || 0.7,
          onChange: e => {
            const updatedTriggers = policy.triggers.map(t => t.type === "natural_language" ? {
              ...t,
              threshold: parseFloat(e.target.value)
            } : t);
            updatePolicy(policy.id, {
              triggers: updatedTriggers
            });
          },
          disabled: !config.enablePolicies
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Threshold: ", (nlTrigger.threshold || 0.7).toFixed(2), " (higher = more strict matching)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: () => {
            const updatedTriggers = policy.triggers.filter(t => t.type !== "natural_language");
            updatePolicy(policy.id, {
              triggers: updatedTriggers
            });
          },
          disabled: !config.enablePolicies,
          style: {
            marginTop: "8px",
            padding: "6px 12px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: config.enablePolicies ? "pointer" : "not-allowed",
            fontSize: "12px"
          }
        }, "Remove Natural Language Trigger")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
          onClick: () => {
            const newTrigger = {
              type: "natural_language",
              value: [],
              target: "agent_response",
              threshold: 0.7
            };
            updatePolicy(policy.id, {
              triggers: [...policy.triggers, newTrigger]
            });
          },
          disabled: !config.enablePolicies,
          style: {
            padding: "6px 12px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: config.enablePolicies ? "pointer" : "not-allowed",
            fontSize: "13px"
          }
        }, "+ Add Natural Language Trigger"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Type natural language triggers and press Enter to add. AI will match similar responses using semantic understanding."));
      })(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Format Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
        value: policy.format_type,
        onChange: e => updatePolicy(policy.id, {
          format_type: e.target.value
        }),
        disabled: !config.enablePolicies
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "direct"
      }, "Direct Answer (No LLM)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "markdown"
      }, "Markdown Instructions (LLM)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
        value: "json_schema"
      }, "JSON Schema (LLM)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, policy.format_type === "direct" ? "Directly replace the response with the provided string (no LLM processing)" : policy.format_type === "markdown" ? "Use LLM to reformat the response according to markdown instructions" : "Use LLM to extract and format the response as JSON matching the schema")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, policy.format_type === "direct" ? "Direct Answer String" : policy.format_type === "markdown" ? "Formatting Instructions (Markdown)" : "JSON Schema"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", {
        value: policy.format_config,
        onChange: e => updatePolicy(policy.id, {
          format_config: e.target.value
        }),
        placeholder: policy.format_type === "direct" ? "You are not allowed to view this sensitive data" : policy.format_type === "markdown" ? "Format the response in a clear, structured way with proper headings and bullet points." : '{\n  "type": "object",\n  "properties": {\n    "summary": {"type": "string"},\n    "details": {"type": "array"}\n  }\n}',
        rows: policy.format_type === "json_schema" ? 12 : policy.format_type === "direct" ? 4 : 8,
        disabled: !config.enablePolicies,
        style: {
          fontFamily: policy.format_type === "direct" ? "inherit" : "monospace",
          fontSize: "13px"
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, policy.format_type === "direct" ? "This exact string will replace the AI response when triggers match (no LLM processing)" : policy.format_type === "markdown" ? "Markdown instructions for how to format the AI response (processed by LLM)" : "JSON schema that the formatted response must match (processed by LLM)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", null, "Priority"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
        type: "number",
        value: policy.priority,
        onChange: e => updatePolicy(policy.id, {
          priority: parseInt(e.target.value)
        }),
        min: "0",
        max: "100",
        disabled: !config.enablePolicies
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, "Higher priority formatters are checked first"))));
    })), outputFormatters.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "empty-state"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "No output formatter policies configured. Click \"Add Output Formatter\" to create one.")));
  }
}

/***/ }),

/***/ "../agentic_chat/src/PolicyBlockComponent.tsx":
/*!****************************************************!*\
  !*** ../agentic_chat/src/PolicyBlockComponent.tsx ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _PolicyBlockComponent_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PolicyBlockComponent.css */ "../agentic_chat/src/PolicyBlockComponent.css");



const PolicyBlockComponent = ({
  data
}) => {
  const {
    content,
    metadata
  } = data;
  const confidencePercent = Math.round(metadata.policy_confidence * 100);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-block-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-block-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-block-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Shield, {
    size: 24
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-block-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Intent Blocked by Policy"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-block-badge"
  }, "Security Policy"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-block-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-block-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.AlertCircle, {
    size: 18,
    className: "message-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, content)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-block-details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-detail-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-label"
  }, "Policy Name:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-value"
  }, metadata.policy_name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-detail-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-label"
  }, "Policy ID:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-value policy-id"
  }, metadata.policy_id)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-detail-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-label"
  }, "Match Confidence:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "confidence-bar-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "confidence-bar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "confidence-bar-fill",
    style: {
      width: `${confidencePercent}%`
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "confidence-value"
  }, confidencePercent, "%"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-reasoning-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "reasoning-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Info, {
    size: 16
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Reasoning")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "reasoning-text"
  }, metadata.policy_reasoning)))));
};
/* harmony default export */ __webpack_exports__["default"] = (PolicyBlockComponent);

/***/ }),

/***/ "../agentic_chat/src/PolicyPlaybookComponent.tsx":
/*!*******************************************************!*\
  !*** ../agentic_chat/src/PolicyPlaybookComponent.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "../node_modules/.pnpm/lucide-react@0.525.0_react@18.3.1/node_modules/lucide-react/dist/esm/lucide-react.js");
/* harmony import */ var _PolicyPlaybookComponent_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PolicyPlaybookComponent.css */ "../agentic_chat/src/PolicyPlaybookComponent.css");



const PolicyPlaybookComponent = ({
  data
}) => {
  const {
    content,
    metadata
  } = data;
  const confidencePercent = Math.round(metadata.policy_confidence * 100);
  const steps = metadata.playbook_steps || [];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-playbook-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-playbook-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-playbook-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.BookOpen, {
    size: 24
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-playbook-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Playbook Activated"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-playbook-badge"
  }, "Guided Workflow"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-playbook-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-playbook-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Lightbulb, {
    size: 18,
    className: "message-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, content || "I'll guide you through this process step by step.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-playbook-details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-detail-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-label"
  }, "Playbook Name:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-value"
  }, metadata.policy_name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-detail-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-label"
  }, "Policy ID:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-value policy-id"
  }, metadata.policy_id)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "policy-detail-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "policy-detail-label"
  }, "Match Confidence:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "confidence-bar-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "confidence-bar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "confidence-bar-fill",
    style: {
      width: `${confidencePercent}%`
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "confidence-value"
  }, confidencePercent, "%"))), steps.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "playbook-steps-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "steps-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Info, {
    size: 16
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Workflow Steps (", steps.length, ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "steps-list"
  }, steps.map((step, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: index,
    className: "step-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "step-number"
  }, step.step_number), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "step-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "step-instruction"
  }, step.instruction), step.expected_outcome && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "step-outcome"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "outcome-label"
  }, "Expected:"), " ", step.expected_outcome), step.tools_allowed && step.tools_allowed.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "step-tools"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "tools-label"
  }, "Tools:"), " ", step.tools_allowed.join(", "))))))), metadata.playbook_guidance && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "playbook-guidance-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "guidance-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_1__.Info, {
    size: 16
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Guidance")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "guidance-text"
  }, metadata.playbook_guidance)))));
};
/* harmony default export */ __webpack_exports__["default"] = (PolicyPlaybookComponent);

/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/LeftSidebar.css":
/*!**************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/LeftSidebar.css ***!
  \**************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".left-sidebar {\n  position: fixed;\n  left: 0;\n  top: 48px;\n  bottom: 0;\n  background: white;\n  border-right: 1px solid #e5e7eb;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);\n  width: 320px;\n  transform: translateX(0);\n  overflow: visible;\n}\n\n.left-sidebar.collapsed {\n  transform: translateX(-100%);\n  box-shadow: none;\n}\n\n.left-sidebar.expanded {\n  transform: translateX(0);\n  animation: slideInFromLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n@keyframes slideInFromLeft {\n  from {\n    transform: translateX(-100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n\n.left-sidebar-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px;\n  border-bottom: 1px solid #e5e7eb;\n  gap: 6px;\n  background: #f9fafb;\n  min-height: 52px;\n}\n\n.left-sidebar-tabs {\n  display: flex;\n  gap: 3px;\n  flex: 1;\n  min-width: 0;\n  background: white;\n  border-radius: 8px;\n  padding: 3px;\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n\n.sidebar-tab {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  padding: 6px 6px;\n  background: transparent;\n  border: none;\n  border-radius: 6px;\n  color: #64748b;\n  font-size: 10.5px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  min-width: 0;\n}\n\n.sidebar-tab span {\n  white-space: nowrap;\n}\n\n.sidebar-tab:hover {\n  background: #f8fafc;\n  color: #4e00ec;\n}\n\n.sidebar-tab.active {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);\n}\n\n.sidebar-tab-info-tooltip-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin-left: 4px;\n  cursor: help;\n}\n\n.sidebar-info-icon {\n  color: #94a3b8;\n  cursor: help;\n  transition: color 0.2s ease;\n  flex-shrink: 0;\n  pointer-events: auto;\n}\n\n.sidebar-tab:hover .sidebar-info-icon {\n  color: #4e00ec;\n}\n\n.sidebar-tab.active .sidebar-info-icon {\n  color: white;\n}\n\n.sidebar-tab-info-tooltip-wrapper:hover .sidebar-info-icon {\n  color: #4e00ec !important;\n}\n\n.sidebar-tab.active .sidebar-tab-info-tooltip-wrapper:hover .sidebar-info-icon {\n  color: #e0e7ff !important;\n}\n\n.sidebar-tab-info-tooltip {\n  position: fixed;\n  top: 60px;\n  left: 20px;\n  width: 320px;\n  max-width: calc(100vw - 40px);\n  padding: 14px 16px;\n  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);\n  border: 2px solid #e0e7ff;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15);\n  font-size: 13px;\n  line-height: 1.6;\n  color: #334155;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;\n  z-index: 9999;\n  pointer-events: none;\n  transform-origin: top left;\n  font-weight: 500;\n  white-space: normal;\n  word-wrap: break-word;\n  word-break: break-word;\n  overflow-wrap: break-word;\n  hyphens: auto;\n}\n\n.sidebar-tab-info-tooltip code {\n  background: #e0e7ff;\n  color: #4f46e5;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;\n  font-size: 12px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.sidebar-tab-info-tooltip-wrapper:hover .sidebar-tab-info-tooltip {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  transform: translateY(2px);\n}\n\n.left-sidebar-toggle {\n  width: 32px;\n  min-width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  cursor: pointer;\n  color: #64748b;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.left-sidebar-toggle:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #4e00ec;\n}\n\n.left-sidebar-content {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: visible;\n  display: flex;\n  flex-direction: column;\n}\n\n.conversations-actions {\n  padding: 12px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n}\n\n.new-conversation-btn {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);\n}\n\n.new-conversation-btn:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);\n}\n\n.new-conversation-btn:active {\n  transform: translateY(0);\n}\n\n.conversations-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px;\n  flex: 1;\n  overflow: visible;\n}\n\n.conversation-item {\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n  position: relative;\n  overflow: visible;\n}\n\n.conversation-item:hover {\n  background: #f1f5f9;\n  border-color: #cbd5e1;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);\n}\n\n.conversation-item.selected {\n  background: #eef2ff;\n  border-color: #667eea;\n  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);\n}\n\n.conversation-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 6px;\n  position: relative;\n  overflow: visible;\n}\n\n.conversation-header svg {\n  color: #667eea;\n  flex-shrink: 0;\n}\n\n.conversation-title {\n  font-size: 13px;\n  font-weight: 600;\n  color: #1e293b;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.delete-conversation-btn {\n  background: none;\n  border: none;\n  color: #94a3b8;\n  cursor: pointer;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  transition: all 0.2s;\n  opacity: 0;\n}\n\n.conversation-item:hover .delete-conversation-btn {\n  opacity: 1;\n}\n\n.delete-conversation-btn:hover {\n  background: #fee2e2;\n  color: #ef4444;\n}\n\n.conversation-preview {\n  font-size: 12px;\n  color: #64748b;\n  line-height: 1.4;\n  margin-bottom: 6px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.conversation-date {\n  font-size: 11px;\n  color: #94a3b8;\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  text-align: center;\n  color: #94a3b8;\n  gap: 8px;\n}\n\n.empty-state svg {\n  opacity: 0.5;\n}\n\n.empty-state p {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #64748b;\n}\n\n.empty-state small {\n  font-size: 12px;\n}\n\n.variables-wrapper {\n  flex: 1;\n  overflow: hidden;\n  position: relative;\n}\n\n.variables-wrapper .variables-sidebar {\n  position: relative !important;\n  left: 0 !important;\n  top: 0 !important;\n  height: 100%;\n  width: 100%;\n  border-right: none;\n  box-shadow: none;\n  transform: none !important;\n}\n\n.variables-wrapper .variables-sidebar-floating-toggle {\n  display: none;\n}\n\n.left-sidebar-floating-toggle {\n  position: fixed;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 64px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-left: none;\n  border-radius: 0 8px 8px 0;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  z-index: 999;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  color: #64748b;\n  animation: slideInToggle 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.left-sidebar-floating-toggle:hover {\n  background: #f8fafc;\n  color: #4e00ec;\n  box-shadow: 2px 0 12px rgba(102, 126, 234, 0.2);\n  transform: translateY(-50%) translateX(4px);\n}\n\n@keyframes slideInToggle {\n  from {\n    transform: translateY(-50%) translateX(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(-50%) translateX(0);\n    opacity: 1;\n  }\n}\n\n.sidebar-floating-count {\n  font-size: 11px;\n  font-weight: 600;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 20px;\n  text-align: center;\n}\n\n.left-sidebar-content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.left-sidebar-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.left-sidebar-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 3px;\n}\n\n.left-sidebar-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n@media (max-width: 768px) {\n  .left-sidebar {\n    width: 280px;\n  }\n}\n\n@media (max-width: 640px) {\n  .left-sidebar {\n    width: 100%;\n    max-width: 300px;\n  }\n}\n\n.flow-item {\n  cursor: default;\n}\n\n.flow-parameters {\n  margin: 8px 0;\n  padding: 8px;\n  background: white;\n  border-radius: 6px;\n  border: 1px solid #e5e7eb;\n}\n\n.flow-function-signature {\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  font-size: 11px;\n  color: #1e293b;\n  line-height: 1.6;\n}\n\n.flow-function-signature code {\n  background: transparent;\n  padding: 0;\n  color: inherit;\n  font-family: inherit;\n}\n\n.flow-params-list {\n  margin-left: 12px;\n  margin-top: 4px;\n}\n\n.flow-param {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-bottom: 2px;\n}\n\n.param-name {\n  color: #667eea;\n  font-weight: 600;\n}\n\n.param-type {\n  color: #64748b;\n  font-style: italic;\n}\n\n.param-default {\n  color: #10b981;\n}\n\n.param-required {\n  color: #ef4444;\n  font-weight: 600;\n  margin-left: 2px;\n}\n\n.flow-info-icon-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n}\n\n.flow-info-icon {\n  color: #94a3b8;\n  cursor: pointer;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.flow-info-icon:hover {\n  color: #667eea;\n  transform: scale(1.1);\n}\n\n.flow-info-tooltip {\n  position: fixed;\n  width: 300px;\n  background: #1e293b;\n  color: white;\n  padding: 14px 16px;\n  border-radius: 8px;\n  font-size: 12px;\n  line-height: 1.5;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);\n  z-index: 99999;\n  animation: tooltipFadeIn 0.2s ease;\n  pointer-events: auto;\n}\n\n.flow-info-tooltip::before {\n  content: '';\n  position: absolute;\n  right: 100%;\n  top: 20px;\n  border: 8px solid transparent;\n  border-right-color: #1e293b;\n}\n\n@keyframes tooltipFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/LeftSidebar.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,OAAO;EACP,SAAS;EACT,SAAS;EACT,iBAAiB;EACjB,+BAA+B;EAC/B,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,6EAA6E;EAC7E,yCAAyC;EACzC,YAAY;EACZ,wBAAwB;EACxB,iBAAiB;AACnB;;AAEA;EACE,4BAA4B;EAC5B,gBAAgB;AAClB;;AAEA;EACE,wBAAwB;EACxB,4DAA4D;AAC9D;;AAEA;EACE;IACE,4BAA4B;EAC9B;EACA;IACE,wBAAwB;EAC1B;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,aAAa;EACb,gCAAgC;EAChC,QAAQ;EACR,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,OAAO;EACP,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,YAAY;EACZ,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,OAAO;EACP,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,QAAQ;EACR,gBAAgB;EAChB,uBAAuB;EACvB,YAAY;EACZ,kBAAkB;EAClB,cAAc;EACd,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;EACf,oBAAoB;EACpB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,6DAA6D;EAC7D,YAAY;EACZ,8CAA8C;AAChD;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,2BAA2B;EAC3B,cAAc;EACd,oBAAoB;AACtB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,SAAS;EACT,UAAU;EACV,YAAY;EACZ,6BAA6B;EAC7B,kBAAkB;EAClB,6DAA6D;EAC7D,yBAAyB;EACzB,mBAAmB;EACnB,gFAAgF;EAChF,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,UAAU;EACV,kBAAkB;EAClB,wEAAwE;EACxE,aAAa;EACb,oBAAoB;EACpB,0BAA0B;EAC1B,gBAAgB;EAChB,mBAAmB;EACnB,qBAAqB;EACrB,sBAAsB;EACtB,yBAAyB;EACzB,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,cAAc;EACd,gBAAgB;EAChB,kBAAkB;EAClB,oEAAoE;EACpE,eAAe;EACf,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;EACpB,0BAA0B;AAC5B;;AAEA;EACE,WAAW;EACX,eAAe;EACf,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;EACjB,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,oBAAoB;EACpB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,gCAAgC;EAChC,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,QAAQ;EACR,kBAAkB;EAClB,6DAA6D;EAC7D,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,gBAAgB;EAChB,eAAe;EACf,oBAAoB;EACpB,8CAA8C;AAChD;;AAEA;EACE,2BAA2B;EAC3B,8CAA8C;AAChD;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,QAAQ;EACR,aAAa;EACb,OAAO;EACP,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,eAAe;EACf,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,2BAA2B;EAC3B,8CAA8C;AAChD;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,8CAA8C;AAChD;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,kBAAkB;EAClB,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,OAAO;EACP,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,cAAc;EACd,eAAe;EACf,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,UAAU;AACZ;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,kBAAkB;EAClB,oBAAoB;EACpB,qBAAqB;EACrB,4BAA4B;EAC5B,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,kBAAkB;EAClB,cAAc;EACd,QAAQ;AACV;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,SAAS;EACT,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;EAC7B,kBAAkB;EAClB,iBAAiB;EACjB,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,gBAAgB;EAChB,0BAA0B;AAC5B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,OAAO;EACP,QAAQ;EACR,2BAA2B;EAC3B,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,yBAAyB;EACzB,iBAAiB;EACjB,0BAA0B;EAC1B,wCAAwC;EACxC,eAAe;EACf,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,QAAQ;EACR,YAAY;EACZ,iDAAiD;EACjD,cAAc;EACd,0DAA0D;AAC5D;;AAEA;EACE,mBAAmB;EACnB,cAAc;EACd,+CAA+C;EAC/C,2CAA2C;AAC7C;;AAEA;EACE;IACE,6CAA6C;IAC7C,UAAU;EACZ;EACA;IACE,yCAAyC;IACzC,UAAU;EACZ;AACF;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,6DAA6D;EAC7D,YAAY;EACZ,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE;IACE,YAAY;EACd;AACF;;AAEA;EACE;IACE,WAAW;IACX,gBAAgB;EAClB;AACF;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,wDAAwD;EACxD,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;EACvB,UAAU;EACV,cAAc;EACd,oBAAoB;AACtB;;AAEA;EACE,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,eAAe;EACf,oBAAoB;EACpB,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,mBAAmB;EACnB,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,0CAA0C;EAC1C,cAAc;EACd,kCAAkC;EAClC,oBAAoB;AACtB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,SAAS;EACT,6BAA6B;EAC7B,2BAA2B;AAC7B;;AAEA;EACE;IACE,UAAU;IACV,0BAA0B;EAC5B;EACA;IACE,UAAU;IACV,wBAAwB;EAC1B;AACF","sourcesContent":[".left-sidebar {\n  position: fixed;\n  left: 0;\n  top: 48px;\n  bottom: 0;\n  background: white;\n  border-right: 1px solid #e5e7eb;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);\n  width: 320px;\n  transform: translateX(0);\n  overflow: visible;\n}\n\n.left-sidebar.collapsed {\n  transform: translateX(-100%);\n  box-shadow: none;\n}\n\n.left-sidebar.expanded {\n  transform: translateX(0);\n  animation: slideInFromLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n@keyframes slideInFromLeft {\n  from {\n    transform: translateX(-100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n\n.left-sidebar-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px;\n  border-bottom: 1px solid #e5e7eb;\n  gap: 6px;\n  background: #f9fafb;\n  min-height: 52px;\n}\n\n.left-sidebar-tabs {\n  display: flex;\n  gap: 3px;\n  flex: 1;\n  min-width: 0;\n  background: white;\n  border-radius: 8px;\n  padding: 3px;\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n\n.sidebar-tab {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  padding: 6px 6px;\n  background: transparent;\n  border: none;\n  border-radius: 6px;\n  color: #64748b;\n  font-size: 10.5px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  min-width: 0;\n}\n\n.sidebar-tab span {\n  white-space: nowrap;\n}\n\n.sidebar-tab:hover {\n  background: #f8fafc;\n  color: #4e00ec;\n}\n\n.sidebar-tab.active {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);\n}\n\n.sidebar-tab-info-tooltip-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin-left: 4px;\n  cursor: help;\n}\n\n.sidebar-info-icon {\n  color: #94a3b8;\n  cursor: help;\n  transition: color 0.2s ease;\n  flex-shrink: 0;\n  pointer-events: auto;\n}\n\n.sidebar-tab:hover .sidebar-info-icon {\n  color: #4e00ec;\n}\n\n.sidebar-tab.active .sidebar-info-icon {\n  color: white;\n}\n\n.sidebar-tab-info-tooltip-wrapper:hover .sidebar-info-icon {\n  color: #4e00ec !important;\n}\n\n.sidebar-tab.active .sidebar-tab-info-tooltip-wrapper:hover .sidebar-info-icon {\n  color: #e0e7ff !important;\n}\n\n.sidebar-tab-info-tooltip {\n  position: fixed;\n  top: 60px;\n  left: 20px;\n  width: 320px;\n  max-width: calc(100vw - 40px);\n  padding: 14px 16px;\n  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);\n  border: 2px solid #e0e7ff;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15);\n  font-size: 13px;\n  line-height: 1.6;\n  color: #334155;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;\n  z-index: 9999;\n  pointer-events: none;\n  transform-origin: top left;\n  font-weight: 500;\n  white-space: normal;\n  word-wrap: break-word;\n  word-break: break-word;\n  overflow-wrap: break-word;\n  hyphens: auto;\n}\n\n.sidebar-tab-info-tooltip code {\n  background: #e0e7ff;\n  color: #4f46e5;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;\n  font-size: 12px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.sidebar-tab-info-tooltip-wrapper:hover .sidebar-tab-info-tooltip {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  transform: translateY(2px);\n}\n\n.left-sidebar-toggle {\n  width: 32px;\n  min-width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  cursor: pointer;\n  color: #64748b;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.left-sidebar-toggle:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #4e00ec;\n}\n\n.left-sidebar-content {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: visible;\n  display: flex;\n  flex-direction: column;\n}\n\n.conversations-actions {\n  padding: 12px;\n  border-bottom: 1px solid #e5e7eb;\n  background: #f9fafb;\n}\n\n.new-conversation-btn {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);\n}\n\n.new-conversation-btn:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);\n}\n\n.new-conversation-btn:active {\n  transform: translateY(0);\n}\n\n.conversations-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px;\n  flex: 1;\n  overflow: visible;\n}\n\n.conversation-item {\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n  position: relative;\n  overflow: visible;\n}\n\n.conversation-item:hover {\n  background: #f1f5f9;\n  border-color: #cbd5e1;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);\n}\n\n.conversation-item.selected {\n  background: #eef2ff;\n  border-color: #667eea;\n  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);\n}\n\n.conversation-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 6px;\n  position: relative;\n  overflow: visible;\n}\n\n.conversation-header svg {\n  color: #667eea;\n  flex-shrink: 0;\n}\n\n.conversation-title {\n  font-size: 13px;\n  font-weight: 600;\n  color: #1e293b;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.delete-conversation-btn {\n  background: none;\n  border: none;\n  color: #94a3b8;\n  cursor: pointer;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  transition: all 0.2s;\n  opacity: 0;\n}\n\n.conversation-item:hover .delete-conversation-btn {\n  opacity: 1;\n}\n\n.delete-conversation-btn:hover {\n  background: #fee2e2;\n  color: #ef4444;\n}\n\n.conversation-preview {\n  font-size: 12px;\n  color: #64748b;\n  line-height: 1.4;\n  margin-bottom: 6px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.conversation-date {\n  font-size: 11px;\n  color: #94a3b8;\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  text-align: center;\n  color: #94a3b8;\n  gap: 8px;\n}\n\n.empty-state svg {\n  opacity: 0.5;\n}\n\n.empty-state p {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #64748b;\n}\n\n.empty-state small {\n  font-size: 12px;\n}\n\n.variables-wrapper {\n  flex: 1;\n  overflow: hidden;\n  position: relative;\n}\n\n.variables-wrapper .variables-sidebar {\n  position: relative !important;\n  left: 0 !important;\n  top: 0 !important;\n  height: 100%;\n  width: 100%;\n  border-right: none;\n  box-shadow: none;\n  transform: none !important;\n}\n\n.variables-wrapper .variables-sidebar-floating-toggle {\n  display: none;\n}\n\n.left-sidebar-floating-toggle {\n  position: fixed;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 64px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-left: none;\n  border-radius: 0 8px 8px 0;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  z-index: 999;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  color: #64748b;\n  animation: slideInToggle 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.left-sidebar-floating-toggle:hover {\n  background: #f8fafc;\n  color: #4e00ec;\n  box-shadow: 2px 0 12px rgba(102, 126, 234, 0.2);\n  transform: translateY(-50%) translateX(4px);\n}\n\n@keyframes slideInToggle {\n  from {\n    transform: translateY(-50%) translateX(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(-50%) translateX(0);\n    opacity: 1;\n  }\n}\n\n.sidebar-floating-count {\n  font-size: 11px;\n  font-weight: 600;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 20px;\n  text-align: center;\n}\n\n.left-sidebar-content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.left-sidebar-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.left-sidebar-content::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 3px;\n}\n\n.left-sidebar-content::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n@media (max-width: 768px) {\n  .left-sidebar {\n    width: 280px;\n  }\n}\n\n@media (max-width: 640px) {\n  .left-sidebar {\n    width: 100%;\n    max-width: 300px;\n  }\n}\n\n.flow-item {\n  cursor: default;\n}\n\n.flow-parameters {\n  margin: 8px 0;\n  padding: 8px;\n  background: white;\n  border-radius: 6px;\n  border: 1px solid #e5e7eb;\n}\n\n.flow-function-signature {\n  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;\n  font-size: 11px;\n  color: #1e293b;\n  line-height: 1.6;\n}\n\n.flow-function-signature code {\n  background: transparent;\n  padding: 0;\n  color: inherit;\n  font-family: inherit;\n}\n\n.flow-params-list {\n  margin-left: 12px;\n  margin-top: 4px;\n}\n\n.flow-param {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-bottom: 2px;\n}\n\n.param-name {\n  color: #667eea;\n  font-weight: 600;\n}\n\n.param-type {\n  color: #64748b;\n  font-style: italic;\n}\n\n.param-default {\n  color: #10b981;\n}\n\n.param-required {\n  color: #ef4444;\n  font-weight: 600;\n  margin-left: 2px;\n}\n\n.flow-info-icon-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n}\n\n.flow-info-icon {\n  color: #94a3b8;\n  cursor: pointer;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.flow-info-icon:hover {\n  color: #667eea;\n  transform: scale(1.1);\n}\n\n.flow-info-tooltip {\n  position: fixed;\n  width: 300px;\n  background: #1e293b;\n  color: white;\n  padding: 14px 16px;\n  border-radius: 8px;\n  font-size: 12px;\n  line-height: 1.5;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);\n  z-index: 99999;\n  animation: tooltipFadeIn 0.2s ease;\n  pointer-events: auto;\n}\n\n.flow-info-tooltip::before {\n  content: '';\n  position: absolute;\n  right: 100%;\n  top: 20px;\n  border: 8px solid transparent;\n  border-right-color: #1e293b;\n}\n\n@keyframes tooltipFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/PolicyBlockComponent.css":
/*!***********************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/PolicyBlockComponent.css ***!
  \***********************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".policy-block-container {\n  background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);\n  border: 2px solid #ff6b6b;\n  border-radius: 12px;\n  padding: 20px;\n  margin: 16px 0;\n  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.15);\n  animation: slideIn 0.3s ease-out;\n}\n\n@keyframes slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.policy-block-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid rgba(255, 107, 107, 0.2);\n}\n\n.policy-block-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 48px;\n  height: 48px;\n  background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);\n  border-radius: 12px;\n  color: white;\n  flex-shrink: 0;\n  box-shadow: 0 4px 8px rgba(255, 107, 107, 0.3);\n}\n\n.policy-block-title {\n  flex: 1;\n}\n\n.policy-block-title h3 {\n  margin: 0 0 6px 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #c92a2a;\n}\n\n.policy-block-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  background: #ff6b6b;\n  color: white;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.policy-block-content {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.policy-block-message {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border-left: 4px solid #ff6b6b;\n}\n\n.message-icon {\n  color: #ff6b6b;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n\n.policy-block-message p {\n  margin: 0;\n  color: #495057;\n  font-size: 15px;\n  line-height: 1.6;\n}\n\n.policy-block-details {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  padding: 16px;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 8px;\n}\n\n.policy-detail-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n}\n\n.policy-detail-label {\n  font-weight: 600;\n  color: #868e96;\n  min-width: 140px;\n}\n\n.policy-detail-value {\n  color: #212529;\n  font-weight: 500;\n}\n\n.policy-id {\n  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;\n  font-size: 13px;\n  padding: 4px 8px;\n  background: rgba(255, 107, 107, 0.1);\n  border-radius: 4px;\n}\n\n.confidence-bar-container {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n\n.confidence-bar {\n  flex: 1;\n  height: 8px;\n  background: rgba(255, 107, 107, 0.2);\n  border-radius: 4px;\n  overflow: hidden;\n}\n\n.confidence-bar-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #ff6b6b 0%, #ff5252 100%);\n  border-radius: 4px;\n  transition: width 0.6s ease-out;\n}\n\n.confidence-value {\n  font-weight: 600;\n  color: #ff6b6b;\n  min-width: 45px;\n  text-align: right;\n}\n\n.policy-reasoning-section {\n  margin-top: 8px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid rgba(255, 107, 107, 0.2);\n}\n\n.reasoning-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  color: #495057;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.reasoning-header svg {\n  color: #ff6b6b;\n}\n\n.reasoning-text {\n  margin: 0;\n  color: #495057;\n  font-size: 14px;\n  line-height: 1.6;\n  font-style: italic;\n}\n\n/* Dark mode support */\n@media (prefers-color-scheme: dark) {\n  .policy-block-container {\n    background: linear-gradient(135deg, #2d1515 0%, #3d1a1a 100%);\n    border-color: #ff6b6b;\n  }\n\n  .policy-block-message {\n    background: rgba(255, 255, 255, 0.05);\n  }\n\n  .policy-block-message p {\n    color: #e9ecef;\n  }\n\n  .policy-block-details {\n    background: rgba(255, 255, 255, 0.03);\n  }\n\n  .policy-detail-value {\n    color: #e9ecef;\n  }\n\n  .policy-reasoning-section {\n    background: rgba(255, 255, 255, 0.05);\n    border-color: rgba(255, 107, 107, 0.3);\n  }\n\n  .reasoning-text {\n    color: #ced4da;\n  }\n}\n\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/PolicyBlockComponent.css"],"names":[],"mappings":"AAAA;EACE,6DAA6D;EAC7D,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;EACb,cAAc;EACd,gDAAgD;EAChD,gCAAgC;AAClC;;AAEA;EACE;IACE,UAAU;IACV,4BAA4B;EAC9B;EACA;IACE,UAAU;IACV,wBAAwB;EAC1B;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,mBAAmB;EACnB,oBAAoB;EACpB,iDAAiD;AACnD;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,WAAW;EACX,YAAY;EACZ,6DAA6D;EAC7D,mBAAmB;EACnB,YAAY;EACZ,cAAc;EACd,8CAA8C;AAChD;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,SAAS;EACT,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,8BAA8B;AAChC;;AAEA;EACE,cAAc;EACd,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,SAAS;EACT,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,aAAa;EACb,oCAAoC;EACpC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,wDAAwD;EACxD,eAAe;EACf,gBAAgB;EAChB,oCAAoC;EACpC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,OAAO;AACT;;AAEA;EACE,OAAO;EACP,WAAW;EACX,oCAAoC;EACpC,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,4DAA4D;EAC5D,kBAAkB;EAClB,+BAA+B;AACjC;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,0CAA0C;AAC5C;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,mBAAmB;EACnB,cAAc;EACd,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,SAAS;EACT,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA,sBAAsB;AACtB;EACE;IACE,6DAA6D;IAC7D,qBAAqB;EACvB;;EAEA;IACE,qCAAqC;EACvC;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,qCAAqC;EACvC;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,qCAAqC;IACrC,sCAAsC;EACxC;;EAEA;IACE,cAAc;EAChB;AACF","sourcesContent":[".policy-block-container {\n  background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);\n  border: 2px solid #ff6b6b;\n  border-radius: 12px;\n  padding: 20px;\n  margin: 16px 0;\n  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.15);\n  animation: slideIn 0.3s ease-out;\n}\n\n@keyframes slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.policy-block-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid rgba(255, 107, 107, 0.2);\n}\n\n.policy-block-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 48px;\n  height: 48px;\n  background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);\n  border-radius: 12px;\n  color: white;\n  flex-shrink: 0;\n  box-shadow: 0 4px 8px rgba(255, 107, 107, 0.3);\n}\n\n.policy-block-title {\n  flex: 1;\n}\n\n.policy-block-title h3 {\n  margin: 0 0 6px 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #c92a2a;\n}\n\n.policy-block-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  background: #ff6b6b;\n  color: white;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.policy-block-content {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.policy-block-message {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border-left: 4px solid #ff6b6b;\n}\n\n.message-icon {\n  color: #ff6b6b;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n\n.policy-block-message p {\n  margin: 0;\n  color: #495057;\n  font-size: 15px;\n  line-height: 1.6;\n}\n\n.policy-block-details {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  padding: 16px;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 8px;\n}\n\n.policy-detail-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n}\n\n.policy-detail-label {\n  font-weight: 600;\n  color: #868e96;\n  min-width: 140px;\n}\n\n.policy-detail-value {\n  color: #212529;\n  font-weight: 500;\n}\n\n.policy-id {\n  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;\n  font-size: 13px;\n  padding: 4px 8px;\n  background: rgba(255, 107, 107, 0.1);\n  border-radius: 4px;\n}\n\n.confidence-bar-container {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n\n.confidence-bar {\n  flex: 1;\n  height: 8px;\n  background: rgba(255, 107, 107, 0.2);\n  border-radius: 4px;\n  overflow: hidden;\n}\n\n.confidence-bar-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #ff6b6b 0%, #ff5252 100%);\n  border-radius: 4px;\n  transition: width 0.6s ease-out;\n}\n\n.confidence-value {\n  font-weight: 600;\n  color: #ff6b6b;\n  min-width: 45px;\n  text-align: right;\n}\n\n.policy-reasoning-section {\n  margin-top: 8px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid rgba(255, 107, 107, 0.2);\n}\n\n.reasoning-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  color: #495057;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.reasoning-header svg {\n  color: #ff6b6b;\n}\n\n.reasoning-text {\n  margin: 0;\n  color: #495057;\n  font-size: 14px;\n  line-height: 1.6;\n  font-style: italic;\n}\n\n/* Dark mode support */\n@media (prefers-color-scheme: dark) {\n  .policy-block-container {\n    background: linear-gradient(135deg, #2d1515 0%, #3d1a1a 100%);\n    border-color: #ff6b6b;\n  }\n\n  .policy-block-message {\n    background: rgba(255, 255, 255, 0.05);\n  }\n\n  .policy-block-message p {\n    color: #e9ecef;\n  }\n\n  .policy-block-details {\n    background: rgba(255, 255, 255, 0.03);\n  }\n\n  .policy-detail-value {\n    color: #e9ecef;\n  }\n\n  .policy-reasoning-section {\n    background: rgba(255, 255, 255, 0.05);\n    border-color: rgba(255, 107, 107, 0.3);\n  }\n\n  .reasoning-text {\n    color: #ced4da;\n  }\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/PolicyPlaybookComponent.css":
/*!**************************************************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/PolicyPlaybookComponent.css ***!
  \**************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Policy Playbook Component Styles */\n\n.policy-playbook-container {\n  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);\n  border: 2px solid #3b82f6;\n  border-radius: 12px;\n  padding: 20px;\n  margin: 16px 0;\n  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);\n  animation: slideIn 0.4s ease-out;\n}\n\n@keyframes slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.policy-playbook-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n  padding-bottom: 16px;\n  border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n}\n\n.policy-playbook-icon {\n  width: 48px;\n  height: 48px;\n  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);\n}\n\n.policy-playbook-title {\n  flex: 1;\n}\n\n.policy-playbook-title h3 {\n  margin: 0 0 6px 0;\n  font-size: 20px;\n  font-weight: 700;\n  color: #1e40af;\n}\n\n.policy-playbook-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  background: rgba(59, 130, 246, 0.15);\n  color: #1e40af;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.policy-playbook-content {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.policy-playbook-message {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border-left: 4px solid #3b82f6;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n\n.policy-playbook-message .message-icon {\n  color: #3b82f6;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n\n.policy-playbook-message p {\n  margin: 0;\n  color: #1e293b;\n  font-size: 15px;\n  line-height: 1.6;\n  font-weight: 500;\n}\n\n.policy-playbook-details {\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 8px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.policy-detail-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n}\n\n.policy-detail-label {\n  font-weight: 600;\n  color: #64748b;\n  min-width: 140px;\n}\n\n.policy-detail-value {\n  color: #1e293b;\n  font-weight: 500;\n}\n\n.policy-id {\n  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;\n  font-size: 13px;\n  padding: 4px 8px;\n  background: rgba(59, 130, 246, 0.1);\n  border-radius: 4px;\n}\n\n.confidence-bar-container {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n\n.confidence-bar {\n  flex: 1;\n  height: 8px;\n  background: rgba(59, 130, 246, 0.2);\n  border-radius: 4px;\n  overflow: hidden;\n}\n\n.confidence-bar-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);\n  border-radius: 4px;\n  transition: width 0.6s ease-out;\n}\n\n.confidence-value {\n  font-weight: 600;\n  color: #3b82f6;\n  min-width: 45px;\n  text-align: right;\n}\n\n.playbook-steps-section {\n  margin-top: 8px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid rgba(59, 130, 246, 0.2);\n}\n\n.steps-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 16px;\n  color: #1e40af;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.steps-header svg {\n  color: #3b82f6;\n}\n\n.steps-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.step-item {\n  display: flex;\n  gap: 12px;\n  padding: 12px;\n  background: #f8fafc;\n  border-radius: 6px;\n  border-left: 3px solid #3b82f6;\n}\n\n.step-number {\n  width: 32px;\n  height: 32px;\n  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  flex-shrink: 0;\n}\n\n.step-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.step-instruction {\n  font-weight: 600;\n  color: #1e293b;\n  font-size: 14px;\n  line-height: 1.5;\n}\n\n.step-outcome {\n  font-size: 13px;\n  color: #64748b;\n  line-height: 1.5;\n}\n\n.outcome-label {\n  font-weight: 600;\n  color: #475569;\n}\n\n.step-tools {\n  font-size: 12px;\n  color: #64748b;\n  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;\n}\n\n.tools-label {\n  font-weight: 600;\n  color: #475569;\n}\n\n.playbook-guidance-section {\n  margin-top: 8px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid rgba(59, 130, 246, 0.2);\n}\n\n.guidance-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  color: #1e40af;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.guidance-header svg {\n  color: #3b82f6;\n}\n\n.guidance-text {\n  color: #475569;\n  font-size: 14px;\n  line-height: 1.6;\n  white-space: pre-wrap;\n}\n\n/* Dark mode support */\n@media (prefers-color-scheme: dark) {\n  .policy-playbook-container {\n    background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%);\n    border-color: #3b82f6;\n  }\n\n  .policy-playbook-title h3 {\n    color: #93c5fd;\n  }\n\n  .policy-playbook-badge {\n    background: rgba(59, 130, 246, 0.25);\n    color: #93c5fd;\n  }\n\n  .policy-playbook-message {\n    background: rgba(255, 255, 255, 0.05);\n  }\n\n  .policy-playbook-message p {\n    color: #e2e8f0;\n  }\n\n  .policy-playbook-details {\n    background: rgba(255, 255, 255, 0.03);\n  }\n\n  .policy-detail-value {\n    color: #e2e8f0;\n  }\n\n  .playbook-steps-section,\n  .playbook-guidance-section {\n    background: rgba(255, 255, 255, 0.05);\n    border-color: rgba(59, 130, 246, 0.3);\n  }\n\n  .step-item {\n    background: rgba(255, 255, 255, 0.05);\n  }\n\n  .step-instruction {\n    color: #e2e8f0;\n  }\n\n  .guidance-text {\n    color: #cbd5e1;\n  }\n}\n\n", "",{"version":3,"sources":["webpack://./../agentic_chat/src/PolicyPlaybookComponent.css"],"names":[],"mappings":"AAAA,qCAAqC;;AAErC;EACE,6DAA6D;EAC7D,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;EACb,cAAc;EACd,6CAA6C;EAC7C,gCAAgC;AAClC;;AAEA;EACE;IACE,UAAU;IACV,4BAA4B;EAC9B;EACA;IACE,UAAU;IACV,wBAAwB;EAC1B;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,mBAAmB;EACnB,oBAAoB;EACpB,gDAAgD;AAClD;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,6DAA6D;EAC7D,mBAAmB;EACnB,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,6CAA6C;AAC/C;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,oCAAoC;EACpC,cAAc;EACd,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,SAAS;EACT,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,8BAA8B;EAC9B,yCAAyC;AAC3C;;AAEA;EACE,cAAc;EACd,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,SAAS;EACT,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,oCAAoC;EACpC,kBAAkB;EAClB,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,wDAAwD;EACxD,eAAe;EACf,gBAAgB;EAChB,mCAAmC;EACnC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,OAAO;AACT;;AAEA;EACE,OAAO;EACP,WAAW;EACX,mCAAmC;EACnC,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,4DAA4D;EAC5D,kBAAkB;EAClB,+BAA+B;AACjC;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,mBAAmB;EACnB,cAAc;EACd,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,8BAA8B;AAChC;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,6DAA6D;EAC7D,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,gBAAgB;EAChB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,OAAO;EACP,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,wDAAwD;AAC1D;;AAEA;EACE,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,mBAAmB;EACnB,cAAc;EACd,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,qBAAqB;AACvB;;AAEA,sBAAsB;AACtB;EACE;IACE,6DAA6D;IAC7D,qBAAqB;EACvB;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,oCAAoC;IACpC,cAAc;EAChB;;EAEA;IACE,qCAAqC;EACvC;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,qCAAqC;EACvC;;EAEA;IACE,cAAc;EAChB;;EAEA;;IAEE,qCAAqC;IACrC,qCAAqC;EACvC;;EAEA;IACE,qCAAqC;EACvC;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,cAAc;EAChB;AACF","sourcesContent":["/* Policy Playbook Component Styles */\n\n.policy-playbook-container {\n  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);\n  border: 2px solid #3b82f6;\n  border-radius: 12px;\n  padding: 20px;\n  margin: 16px 0;\n  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);\n  animation: slideIn 0.4s ease-out;\n}\n\n@keyframes slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.policy-playbook-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n  padding-bottom: 16px;\n  border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n}\n\n.policy-playbook-icon {\n  width: 48px;\n  height: 48px;\n  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);\n}\n\n.policy-playbook-title {\n  flex: 1;\n}\n\n.policy-playbook-title h3 {\n  margin: 0 0 6px 0;\n  font-size: 20px;\n  font-weight: 700;\n  color: #1e40af;\n}\n\n.policy-playbook-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  background: rgba(59, 130, 246, 0.15);\n  color: #1e40af;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.policy-playbook-content {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.policy-playbook-message {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border-left: 4px solid #3b82f6;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n\n.policy-playbook-message .message-icon {\n  color: #3b82f6;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n\n.policy-playbook-message p {\n  margin: 0;\n  color: #1e293b;\n  font-size: 15px;\n  line-height: 1.6;\n  font-weight: 500;\n}\n\n.policy-playbook-details {\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 8px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.policy-detail-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n}\n\n.policy-detail-label {\n  font-weight: 600;\n  color: #64748b;\n  min-width: 140px;\n}\n\n.policy-detail-value {\n  color: #1e293b;\n  font-weight: 500;\n}\n\n.policy-id {\n  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;\n  font-size: 13px;\n  padding: 4px 8px;\n  background: rgba(59, 130, 246, 0.1);\n  border-radius: 4px;\n}\n\n.confidence-bar-container {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n\n.confidence-bar {\n  flex: 1;\n  height: 8px;\n  background: rgba(59, 130, 246, 0.2);\n  border-radius: 4px;\n  overflow: hidden;\n}\n\n.confidence-bar-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);\n  border-radius: 4px;\n  transition: width 0.6s ease-out;\n}\n\n.confidence-value {\n  font-weight: 600;\n  color: #3b82f6;\n  min-width: 45px;\n  text-align: right;\n}\n\n.playbook-steps-section {\n  margin-top: 8px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid rgba(59, 130, 246, 0.2);\n}\n\n.steps-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 16px;\n  color: #1e40af;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.steps-header svg {\n  color: #3b82f6;\n}\n\n.steps-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.step-item {\n  display: flex;\n  gap: 12px;\n  padding: 12px;\n  background: #f8fafc;\n  border-radius: 6px;\n  border-left: 3px solid #3b82f6;\n}\n\n.step-number {\n  width: 32px;\n  height: 32px;\n  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  flex-shrink: 0;\n}\n\n.step-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.step-instruction {\n  font-weight: 600;\n  color: #1e293b;\n  font-size: 14px;\n  line-height: 1.5;\n}\n\n.step-outcome {\n  font-size: 13px;\n  color: #64748b;\n  line-height: 1.5;\n}\n\n.outcome-label {\n  font-weight: 600;\n  color: #475569;\n}\n\n.step-tools {\n  font-size: 12px;\n  color: #64748b;\n  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;\n}\n\n.tools-label {\n  font-weight: 600;\n  color: #475569;\n}\n\n.playbook-guidance-section {\n  margin-top: 8px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid rgba(59, 130, 246, 0.2);\n}\n\n.guidance-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  color: #1e40af;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.guidance-header svg {\n  color: #3b82f6;\n}\n\n.guidance-text {\n  color: #475569;\n  font-size: 14px;\n  line-height: 1.6;\n  white-space: pre-wrap;\n}\n\n/* Dark mode support */\n@media (prefers-color-scheme: dark) {\n  .policy-playbook-container {\n    background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%);\n    border-color: #3b82f6;\n  }\n\n  .policy-playbook-title h3 {\n    color: #93c5fd;\n  }\n\n  .policy-playbook-badge {\n    background: rgba(59, 130, 246, 0.25);\n    color: #93c5fd;\n  }\n\n  .policy-playbook-message {\n    background: rgba(255, 255, 255, 0.05);\n  }\n\n  .policy-playbook-message p {\n    color: #e2e8f0;\n  }\n\n  .policy-playbook-details {\n    background: rgba(255, 255, 255, 0.03);\n  }\n\n  .policy-detail-value {\n    color: #e2e8f0;\n  }\n\n  .playbook-steps-section,\n  .playbook-guidance-section {\n    background: rgba(255, 255, 255, 0.05);\n    border-color: rgba(59, 130, 246, 0.3);\n  }\n\n  .step-item {\n    background: rgba(255, 255, 255, 0.05);\n  }\n\n  .step-instruction {\n    color: #e2e8f0;\n  }\n\n  .guidance-text {\n    color: #cbd5e1;\n  }\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../agentic_chat/src/LeftSidebar.css":
/*!*******************************************!*\
  !*** ../agentic_chat/src/LeftSidebar.css ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_LeftSidebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!./LeftSidebar.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/LeftSidebar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_LeftSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_LeftSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_LeftSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_LeftSidebar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/PolicyBlockComponent.css":
/*!****************************************************!*\
  !*** ../agentic_chat/src/PolicyBlockComponent.css ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyBlockComponent_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!./PolicyBlockComponent.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/PolicyBlockComponent.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyBlockComponent_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyBlockComponent_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyBlockComponent_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyBlockComponent_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../agentic_chat/src/PolicyPlaybookComponent.css":
/*!*******************************************************!*\
  !*** ../agentic_chat/src/PolicyPlaybookComponent.css ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/.pnpm/style-loader@4.0.0_webpack@5.105.0/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyPlaybookComponent_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!./PolicyPlaybookComponent.css */ "../node_modules/.pnpm/css-loader@7.1.2_webpack@5.105.0/node_modules/css-loader/dist/cjs.js!../agentic_chat/src/PolicyPlaybookComponent.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_105_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyPlaybookComponent_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyPlaybookComponent_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyPlaybookComponent_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_105_0_node_modules_css_loader_dist_cjs_js_PolicyPlaybookComponent_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

}]);
//# sourceMappingURL=main-agentic_chat_src_K.09e7fbce0f580676756a.js.map