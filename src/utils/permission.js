const roleToRouter = {
    "coustomer": [
        {
            name: 'Product',
        },
        {
            name: 'ProductList',
        },
        {
            name: 'ProductAdd'
        }
    ],
    "admin": [
        {
            name: 'Product',
        },
        {
            name: 'ProductList',
        },
        {
            name: 'ProductAdd'
        },
        {
            name: 'Category'
        }
    ]
}

export default function getMenuRoute(role, routes){
    const allowRoutesName = roleToRouter[role].map((item)=>item.name);
    return routes.filter((r) => {
        if (allowRoutesName.indexOf(r.name) !== -1) {
            if (r.children) {
                const children = r.children;
                r.children = children.filter((c) => {
                    return allowRoutesName.indexOf(c.name) !== -1;
                });
            }
            return true;
        }
        return false;
    });
}