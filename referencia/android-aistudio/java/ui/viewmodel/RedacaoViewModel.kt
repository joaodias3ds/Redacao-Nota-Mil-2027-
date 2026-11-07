package com.example.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.api.StructuralFeedback
import com.example.data.model.ClassRollStudent
import com.example.data.model.CourseMetrics
import com.example.data.model.EssayDraft
import com.example.data.model.EssayEvaluation
import com.example.data.model.EvolutionItem
import com.example.data.model.ParentViewData
import com.example.data.model.RepertoryCard
import com.example.data.model.StudentProfile
import com.example.data.model.TeacherEssayItem
import com.example.data.model.ThemeConfig
import com.example.data.model.UserRole
import com.example.data.repository.EssayRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

enum class AppScreen {
  ONBOARDING,
  LOGIN,
  MAIN,
  NOVA_REDACAO,
  STATUS_CORRECAO,
  PRE_CORRECAO,
  TEACHER_GRADE_DETAIL
}

enum class MainTab {
  HOJE,
  FEED,
  EVOLUCAO,
  PERFIL
}

enum class FeedTab {
  PARA_VOCE,
  TEMAS,
  SALVOS
}

data class UiState(
  val currentScreen: AppScreen = AppScreen.ONBOARDING,
  val currentRole: UserRole = UserRole.ALUNO,
  val currentTab: MainTab = MainTab.HOJE,
  val feedTab: FeedTab = FeedTab.PARA_VOCE,
  val feedCardIndex: Int = 0,
  val isLoggedIn: Boolean = false,
  val isAnalyzingWithGemini: Boolean = false,
  val structuralFeedback: StructuralFeedback? = null,
  val selectedTeacherEssay: TeacherEssayItem? = null,
  val showAttendanceDialog: Boolean = false,
  val showSourceDialog: RepertoryCard? = null,
  val toastMessage: String? = null
)

class RedacaoViewModel(
  private val repository: EssayRepository = EssayRepository()
) : ViewModel() {

  private val _uiState = MutableStateFlow(UiState())
  val uiState: StateFlow<UiState> = _uiState.asStateFlow()

  val studentProfile: StateFlow<StudentProfile> = repository.studentProfile
  val currentDraft: StateFlow<EssayDraft> = repository.currentDraft
  val repertories: StateFlow<List<RepertoryCard>> = repository.repertories
  val viewedCardsCount: StateFlow<Int> = repository.viewedCardsCount
  val currentEvaluation: StateFlow<EssayEvaluation> = repository.currentEvaluation
  val evolutionItems: StateFlow<List<EvolutionItem>> = repository.evolutionItems
  val teacherQueue: StateFlow<List<TeacherEssayItem>> = repository.teacherQueue
  val classRoll: StateFlow<List<ClassRollStudent>> = repository.classRoll
  val parentData: StateFlow<ParentViewData> = repository.parentData
  val adminMetrics: StateFlow<CourseMetrics> = repository.adminMetrics
  val themesList: StateFlow<List<ThemeConfig>> = repository.themesList

  fun navigateTo(screen: AppScreen) {
    _uiState.update { it.copy(currentScreen = screen) }
  }

  fun switchRole(role: UserRole) {
    _uiState.update {
      it.copy(
        currentRole = role,
        currentScreen = AppScreen.MAIN,
        currentTab = MainTab.HOJE,
        toastMessage = "Modo alterado para: ${role.label}"
      )
    }
  }

  fun selectTab(tab: MainTab) {
    _uiState.update { it.copy(currentTab = tab, currentScreen = AppScreen.MAIN) }
  }

  fun selectFeedTab(tab: FeedTab) {
    _uiState.update { it.copy(feedTab = tab, feedCardIndex = 0) }
  }

  fun nextFeedCard(maxCards: Int) {
    repository.markCardViewed()
    _uiState.update {
      val next = if (it.feedCardIndex + 1 < maxCards) it.feedCardIndex + 1 else 0
      it.copy(feedCardIndex = next)
    }
  }

  fun prevFeedCard(maxCards: Int) {
    _uiState.update {
      val prev = if (it.feedCardIndex - 1 >= 0) it.feedCardIndex - 1 else maxCards - 1
      it.copy(feedCardIndex = prev)
    }
  }

  fun updateDraftText(text: String) {
    repository.updateDraftText(text)
  }

  fun toggleSaveRepertory(id: String) {
    repository.toggleSaveRepertory(id)
    _uiState.update { it.copy(toastMessage = "Item atualizado nos seus salvos") }
  }

  fun useRepertory(card: RepertoryCard) {
    repository.insertRepertoryIntoDraft(card.title, card.authorYear)
    _uiState.update {
      it.copy(
        currentScreen = AppScreen.NOVA_REDACAO,
        toastMessage = "Repertório adicionado ao rascunho!"
      )
    }
  }

  // Gemini AI Analysis Call
  fun analyzeWithGemini() {
    viewModelScope.launch {
      _uiState.update { it.copy(isAnalyzingWithGemini = true) }
      val draft = currentDraft.value
      val result = repository.analyzeWithGemini(draft.theme, draft.text)
      _uiState.update {
        it.copy(
          isAnalyzingWithGemini = false,
          structuralFeedback = result,
          toastMessage = "Análise estrutural da IA concluída!"
        )
      }
    }
  }

  fun dismissStructuralFeedback() {
    _uiState.update { it.copy(structuralFeedback = null) }
  }

  fun submitDraft() {
    repository.submitDraftForCorrection()
    _uiState.update {
      it.copy(
        currentScreen = AppScreen.STATUS_CORRECAO,
        toastMessage = "Redação enviada com sucesso para a fila do professor!"
      )
    }
  }

  fun login(email: String) {
    _uiState.update {
      it.copy(
        isLoggedIn = true,
        currentScreen = AppScreen.MAIN,
        currentTab = MainTab.HOJE
      )
    }
  }

  fun logout() {
    _uiState.update {
      it.copy(
        isLoggedIn = false,
        currentScreen = AppScreen.LOGIN
      )
    }
  }

  fun clearToast() {
    _uiState.update { it.copy(toastMessage = null) }
  }

  // Teacher actions
  fun openTeacherGrading(essay: TeacherEssayItem) {
    _uiState.update {
      it.copy(
        selectedTeacherEssay = essay,
        currentScreen = AppScreen.TEACHER_GRADE_DETAIL
      )
    }
  }

  fun publishTeacherGrade(c1: Int, c2: Int, c3: Int, c4: Int, c5: Int, notes: String) {
    val essay = _uiState.value.selectedTeacherEssay ?: return
    repository.publishTeacherCorrection(essay.id, c1, c2, c3, c4, c5, notes)
    _uiState.update {
      it.copy(
        currentScreen = AppScreen.MAIN,
        selectedTeacherEssay = null,
        toastMessage = "Nota oficial publicada com sucesso para o aluno!"
      )
    }
  }

  fun toggleStudentAttendance(studentId: String) {
    repository.toggleStudentAttendance(studentId)
  }

  fun createTheme(title: String, category: String, deadline: String) {
    repository.addNewTheme(title, category, deadline)
    _uiState.update {
      it.copy(toastMessage = "Novo tema ativado para a turma presencial!")
    }
  }
}
