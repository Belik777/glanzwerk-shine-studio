import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, Component, type ReactNode } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

class AnimatedSectionErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? <div className={(this.props as Props).className}>{this.props.children}</div> : this.props.children;
  }
}

function AnimatedSectionInner({ children, className = "", delay = 0 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection(props: Props) {
  return (
    <AnimatedSectionErrorBoundary {...props}>
      <AnimatedSectionInner {...props} />
    </AnimatedSectionErrorBoundary>
  );
}
