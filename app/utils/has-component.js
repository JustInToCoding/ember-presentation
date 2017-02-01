export default function hasComponent(owner, component) {
    let lookup = owner.lookup('component-lookup:main');
    if (!lookup.componentFor) {
      return !!lookup.lookupFactory(component);
    }
    return !!(lookup.componentFor(component, owner) || lookup.layoutFor(component, owner));
}
