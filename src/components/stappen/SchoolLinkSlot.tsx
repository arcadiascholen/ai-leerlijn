import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { appear } from '../../lib/motion';
import { initSchoolLinks } from './schoolLink';

// A <SchoolLink> inside a React island (docs/BRIEFING.md § 12, "Een link per
// school"). The island's .astro wrapper passes the <SchoolLink> as children:
//
//   <Island client:load><SchoolLink href={eindformulier}>…</SchoolLink></Island>
//
// so Astro renders it on the server, with the four addresses, the dialog and
// the styles of SchoolLink.astro. The island renders those children through
// this component, which wires them with the script of SchoolLink.astro
// (schoolLink.ts) once React put them in the page. React does not render
// them again after that, so the wiring stays.
//
// `hidden` keeps the link in the page but out of sight, so that it does not
// have to be built again when it shows. When it shows after being hidden,
// which only follows an action of the student, it fades in
// (docs/DESIGN.md, "Beweging").

interface Props {
  readonly children: ReactNode;
  readonly hidden?: boolean;
  readonly className?: string;
}

export default function SchoolLinkSlot({ children, hidden = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const wasHidden = useRef(hidden);

  useEffect(() => {
    const element = ref.current;
    return element === null ? undefined : initSchoolLinks(element);
  }, []);

  useLayoutEffect(() => {
    if (!hidden && wasHidden.current && ref.current !== null) appear(ref.current);
    wasHidden.current = hidden;
  }, [hidden]);

  return (
    <div ref={ref} className={className} hidden={hidden}>
      {children}
    </div>
  );
}
