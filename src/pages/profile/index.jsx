import { StudentProfile } from '@features/profile/ui/student-profile'
import SharedHeader from '@shared/ui/base-header'

const ProfilePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SharedHeader />
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto py-6">
          <StudentProfile />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
