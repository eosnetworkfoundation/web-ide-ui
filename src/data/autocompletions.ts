export const autocompletions = (Monaco:any) => {
    const EOS_TYPES = [
        "CONTRACT", "eosio",
        "uint8_t", "uint16_t", "uint32_t", "uint64_t", "uint128_t", "uint256_t",
        "int8_t", "int16_t", "int32_t", "int64_t", "int128_t", "int256_t",
        "asset", "name", "bool", "time_point", "time_point_sec", "block_timestamp_type",
        "float64_t", "float128_t", "checksum256", "checksum160", "checksum512", "checksum512",
        "public_key", "signature", "symbol", "symbol_code", "extended_asset"
    ];

    const CPP_SUGGESTIONS = [
        {
            label: 'auto',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'auto',
        },
        {
            label: 'using',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'using',
        },
        {
            label: 'namespace',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'namespace',
        },
        {
            label: 'class',
            kind: Monaco.languages.CompletionItemKind.Class,
            insertText: 'class',
        },
        {
            label: 'const',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'const',
        },
        {
            label: 'constexpr',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'constexpr',
        },
        {
            label: 'static',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'static',
        },
        {
            label: 'reinterpret_cast',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'reinterpret_cast<>()',
        },
        {
            label: 'dynamic_cast',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'dynamic_cast<>()',
        },
        {
            label: 'explicit',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'explicit',
        },
        {
            label: 'friend',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'friend',
        },
        {
            label: 'inline',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'inline',
        },
        {
            label: 'mutable',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'mutable',
        },
        {
            label: 'override',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'override',
        },
        {
            label: 'break',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'break',
        },
        {
            label: 'case',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'case ${1:value}:${0}',
        },
        {
            label: 'catch',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'catch (${1:exception_type} ${2:exception}) ${3:block}',
        },
        {
            label: 'char',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'char',
        },
        {
            label: 'char16_t',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'char16_t',
        },
        {
            label: 'char32_t',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'char32_t',
        },
        {
            label: 'const_cast',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'const_cast<>()',
        },
        {
            label: 'continue',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'continue',
        },
        {
            label: 'decltype',
            kind: Monaco.languages.CompletionItemKind.Snippet,
            insertText: 'decltype()',
        },
        {
            label: 'else',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'else ${1:block}',
        },
        {
            label: 'enum',
            kind: Monaco.languages.CompletionItemKind.Enum,
            insertText: 'enum',
        },
        {
            label: 'extern',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'extern',
        },
        {
            label: 'false',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'false',
        },
        {
            label: 'for',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'for () {}',
        },
        {
            label: 'if',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'if () {}',
        },
        {
            label: 'import',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'import',
        },
        {
            label: 'include',
            kind: Monaco.languages.CompletionItemKind.File,
            insertText: '#include',
        },
        {
            label: 'int',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'int',
        },
        {
            label: 'long',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'long',
        },
        {
            label: 'module',
            kind: Monaco.languages.CompletionItemKind.Module,
            insertText: 'module',
        },
        {
            label: 'new',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'new ${1:type}(${2:args})',
        },
        {
            label: 'nullptr',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'nullptr',
        },
        {
            label: 'private',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'private',
        },
        {
            label: 'protected',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'protected',
        },
        {
            label: 'public',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'public',
        },
        {
            label: 'register',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'register',
        },
        {
            label: 'return',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'return',
        },
        {
            label: 'short',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'short',
        },
        {
            label: 'signed',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'signed',
        },
        {
            label: 'sizeof',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'sizeof()',
        },
        {
            label: 'static_cast',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'static_cast<>()',
        },
        {
            label: 'struct',
            kind: Monaco.languages.CompletionItemKind.Struct,
            insertText: 'struct',
        },
        {
            label: 'switch',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'switch () {}',
        },
        {
            label: 'template',
            kind: Monaco.languages.CompletionItemKind.Snippet,
            insertText: 'template',
        },
        {
            label: 'true',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'true',
        },
        {
            label: 'try',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'try {} catch () {}',
        },
        {
            label: 'typedef',
            kind: Monaco.languages.CompletionItemKind.Type,
            insertText: 'typedef',
        },
        {
            label: 'typeid',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'typeid',
        },
        {
            label: 'typename',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'typename',
        },
        {
            label: 'union',
            kind: Monaco.languages.CompletionItemKind.Struct,
            insertText: 'union',
        },
        {
            label: 'unsigned',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'unsigned',
        },
        {
            label: 'virtual',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'virtual',
        },
        {
            label: 'void',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'void',
        },
        {
            label: 'volatile',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'volatile',
        },
        {
            label: 'wchar_t',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'wchar_t',
        },
        {
            label: 'while',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'while (){}',
        },
    ]



    return [
        ...CPP_SUGGESTIONS,
        {
            label: 'ACTION',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: 'ACTION ',
            documentation: 'A function that can be called by a transaction',
        },
        {
            label: 'TABLE',
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: `TABLE tablestruct {
    uint64_t id;
    
    uint64_t primary_key() const { 
        return id; 
    }
};
    
using new_table = eosio::multi_index<"mytable"_n, tablestruct>;`,
            documentation: 'A struct that can be stored in a database',
        },
        ...EOS_TYPES.map(type => ({
            label: type,
            kind: Monaco.languages.CompletionItemKind.Keyword,
            insertText: `${type} `,
        })),
        {
            label: 'require_auth',
            kind: Monaco.languages.CompletionItemKind.Method,
            insertText: 'require_auth(ACCOUNT);',
            documentation: 'Checks if the current transaction has authorization for the given account, and asserts if it does not',
            detail: 'void require_auth(eosio::name account);',
        },
        {
            label: 'require_auth2',
            kind: Monaco.languages.CompletionItemKind.Method,
            insertText: 'require_auth2(ACCOUNT, PERMISSION);',
            documentation: 'Checks if the current transaction has authorization for the given account, and asserts if it does not',
            detail: 'void require_auth(eosio::name account, eosio::name permission);',
        },
        {
            label: 'has_auth',
            kind: Monaco.languages.CompletionItemKind.Method,
            insertText: 'has_auth(ACCOUNT);',
            documentation: 'Checks if the current transaction has authorization for the given account',
            detail: 'void has_auth(eosio::name account);',
        },
        {
            label: 'primary_key',
            kind: Monaco.languages.CompletionItemKind.Method,
            insertText: 'uint64_t primary_key() const { return VALUE; }',
            documentation: 'The primary key of the table',
        },
        {
            label: 'get_self',
            kind: Monaco.languages.CompletionItemKind.Method,
            insertText: 'get_self()',
            documentation: 'Gets the account that the contract is deployed to',
        },
        {
            label: 'assert',
            kind: Monaco.languages.CompletionItemKind.Method,
            insertText: 'assert(CONDITION);',
            detail: 'void assert(bool condition);',
            documentation: 'Throws an exception if the condition is false',
        },
        {
            label: 'check',
            kind: Monaco.languages.CompletionItemKind.Method,
            insertText: 'check(CONDITION, ERROR_MESSAGE);',
            detail: 'void check(bool condition, string error_message);',
            documentation: 'Throws an exception if the condition is false',
        },
        {
            label: 'require_recipient',
            kind: Monaco.languages.CompletionItemKind.Method,
            insertText: 'require_recipient(ACCOUNT);',
            detail: 'void require_recipient(eosio::name recipient);',
            documentation: 'Sends a notification to the given account',
        },
        {
            label: 'on_notify',
            kind: Monaco.languages.CompletionItemKind.Method,
            insertText: `[[eosio::on_notify("CONTRACT::ACTION")]]
void handle_notify(...NOTIFY_PARAMS){

}`,
            detail: 'void on_notify(string action);',
            documentation: 'Marks a function to be called when a notification is received',
        },

    ];
}
