interface Props {
  title: string
  breadcrumb?: string
}

export default function PlaceholderPage({ title, breadcrumb }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 pt-[90px]" style={{ fontFamily: "'Pretendard', sans-serif" }}>
      <div className="mx-auto flex items-center justify-center" style={{ maxWidth: 1400, minHeight: "calc(100vh - 90px)" }}>
        <div className="text-center">
          {breadcrumb && (
            <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: "'Pretendard:Regular', sans-serif" }}>{breadcrumb}</p>
          )}
          <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Pretendard:Bold', sans-serif" }}>{title}</h1>
          <p className="mt-3 text-gray-500" style={{ fontFamily: "'Pretendard:Regular', sans-serif" }}>페이지 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
