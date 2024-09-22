interface Props {
  params: {
    name: string[];
  };
}

export default function NotFound({ params }: Props) {
  const path = Object.values(params).toString();

  return (
    <div className="grid h-[calc(100vh-21rem)] place-items-center">
      <h2>The /{path} is not found</h2>
    </div>
  );
}
