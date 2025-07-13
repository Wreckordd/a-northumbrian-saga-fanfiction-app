(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/admin/edit-books/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>EditBooksPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function EditBooksPage() {
    _s();
    const [books, setBooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: "book1",
            title: "Crown Of Thorns",
            description: "The first tale in the Northumbrian Saga",
            chapters: [
                {
                    id: "ch1",
                    title: "Chapter 1: The Beginning",
                    content: "In the cold mists of Northumbria, a tale begins...",
                    excerpt: "In the cold mists of Northumbria..."
                },
                {
                    id: "ch2",
                    title: "Chapter 2: The Gathering Storm",
                    content: "Dark clouds gather over the moors as conflict approaches...",
                    excerpt: "Dark clouds gather over the moors..."
                }
            ]
        },
        {
            id: "book2",
            title: "The Blood Tides",
            description: "The second tale in the Northumbrian Saga",
            chapters: [
                {
                    id: "ch1",
                    title: "Chapter 1: Rising Waters",
                    content: "The tides of war begin to turn...",
                    excerpt: "The tides of war begin to turn..."
                }
            ]
        },
        {
            id: "book3",
            title: "Kingmaker",
            description: "The third tale in the Northumbrian Saga",
            chapters: [
                {
                    id: "ch1",
                    title: "Chapter 1: The Crown's Weight",
                    content: "Power comes with a heavy price...",
                    excerpt: "Power comes with a heavy price..."
                }
            ]
        }
    ]);
    const [selectedBook, setSelectedBook] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedChapter, setSelectedChapter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingContent, setEditingContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingTitle, setEditingTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleBookSelect = (bookId)=>{
        setSelectedBook(bookId);
        setSelectedChapter("");
        setIsEditing(false);
    };
    const handleChapterSelect = (chapterId)=>{
        setSelectedChapter(chapterId);
        const book = books.find((b)=>b.id === selectedBook);
        const chapter = book?.chapters.find((c)=>c.id === chapterId);
        if (chapter) {
            setEditingTitle(chapter.title);
            setEditingContent(chapter.content);
            setIsEditing(true);
        }
    };
    const handleSaveChapter = ()=>{
        setBooks((prevBooks)=>prevBooks.map((book)=>book.id === selectedBook ? {
                    ...book,
                    chapters: book.chapters.map((chapter)=>chapter.id === selectedChapter ? {
                            ...chapter,
                            title: editingTitle,
                            content: editingContent,
                            excerpt: editingContent.substring(0, 100) + "..."
                        } : chapter)
                } : book));
        alert("Chapter saved successfully!");
    };
    const handleAddChapter = ()=>{
        if (!selectedBook) return;
        const newChapterId = `ch${Date.now()}`;
        const newChapter = {
            id: newChapterId,
            title: "New Chapter",
            content: "Enter your chapter content here...",
            excerpt: "Enter your chapter content here..."
        };
        setBooks((prevBooks)=>prevBooks.map((book)=>book.id === selectedBook ? {
                    ...book,
                    chapters: [
                        ...book.chapters,
                        newChapter
                    ]
                } : book));
        setSelectedChapter(newChapterId);
        setEditingTitle(newChapter.title);
        setEditingContent(newChapter.content);
        setIsEditing(true);
    };
    const selectedBookData = books.find((b)=>b.id === selectedBook);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-unifraktur-cook text-amber-300 mb-8 text-center",
                children: "Edit Book Content"
            }, void 0, false, {
                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-3 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-medieval-sharp text-amber-300 mb-4",
                                children: "Select Book"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: books.map((book)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleBookSelect(book.id),
                                        className: `w-full text-left p-3 rounded transition ${selectedBook === book.id ? "bg-amber-800 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: book.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm opacity-75",
                                                children: [
                                                    book.chapters.length,
                                                    " chapters"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                                lineNumber: 141,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, book.id, true, {
                                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-medieval-sharp text-amber-300",
                                        children: "Chapters"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this),
                                    selectedBook && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddChapter,
                                        className: "bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition",
                                        children: "+ Add Chapter"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            selectedBookData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: selectedBookData.chapters.map((chapter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleChapterSelect(chapter.id),
                                        className: `w-full text-left p-3 rounded transition ${selectedChapter === chapter.id ? "bg-amber-800 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-sm",
                                                children: chapter.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                                lineNumber: 173,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs opacity-75 mt-1",
                                                children: chapter.excerpt
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, chapter.id, true, {
                                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-center py-8",
                                children: "Select a book to view chapters"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-medieval-sharp text-amber-300 mb-4",
                                children: "Chapter Editor"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this),
                            isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-amber-300 font-semibold mb-2",
                                                children: "Chapter Title"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: editingTitle,
                                                onChange: (e)=>setEditingTitle(e.target.value),
                                                className: "w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                                lineNumber: 191,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-amber-300 font-semibold mb-2",
                                                children: "Chapter Content"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: editingContent,
                                                onChange: (e)=>setEditingContent(e.target.value),
                                                rows: 12,
                                                className: "w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:border-amber-500 focus:outline-none resize-vertical"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSaveChapter,
                                        className: "w-full bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 rounded transition",
                                        children: "Save Chapter"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-center py-8",
                                children: "Select a chapter to edit"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/edit-books/page.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "/admin",
                    className: "inline-block bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded font-medieval-sharp transition",
                    children: "← Back to Admin Panel"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/edit-books/page.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/edit-books/page.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/edit-books/page.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s(EditBooksPage, "e3SztPGscN36UHPPU+9OvMsIG4A=");
_c = EditBooksPage;
var _c;
__turbopack_context__.k.register(_c, "EditBooksPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_admin_edit-books_page_tsx_430ed149._.js.map