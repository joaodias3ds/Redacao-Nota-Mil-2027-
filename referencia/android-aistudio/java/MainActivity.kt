package com.example

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.data.model.UserRole
import com.example.ui.components.AppBottomNavigation
import com.example.ui.components.RoleSwitcherBar
import com.example.ui.screens.AdminDashboardScreen
import com.example.ui.screens.EvolucaoScreen
import com.example.ui.screens.FeedScreen
import com.example.ui.screens.HojeScreen
import com.example.ui.screens.LoginScreen
import com.example.ui.screens.NovaRedacaoScreen
import com.example.ui.screens.OnboardingScreen
import com.example.ui.screens.ParentDashboardScreen
import com.example.ui.screens.PerfilScreen
import com.example.ui.screens.PreCorrecaoScreen
import com.example.ui.screens.StatusCorrecaoScreen
import com.example.ui.screens.TeacherDashboardScreen
import com.example.ui.screens.TeacherGradeScreen
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.theme.PinkPrimary
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.FeedTab
import com.example.ui.viewmodel.MainTab
import com.example.ui.viewmodel.RedacaoViewModel

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        RedacaoApp()
      }
    }
  }
}

@Composable
fun RedacaoApp(
  viewModel: RedacaoViewModel = viewModel()
) {
  val uiState by viewModel.uiState.collectAsStateWithLifecycle()
  val studentProfile by viewModel.studentProfile.collectAsStateWithLifecycle()
  val draft by viewModel.currentDraft.collectAsStateWithLifecycle()
  val repertories by viewModel.repertories.collectAsStateWithLifecycle()
  val viewedCount by viewModel.viewedCardsCount.collectAsStateWithLifecycle()
  val evaluation by viewModel.currentEvaluation.collectAsStateWithLifecycle()
  val evolutionItems by viewModel.evolutionItems.collectAsStateWithLifecycle()
  val teacherQueue by viewModel.teacherQueue.collectAsStateWithLifecycle()
  val classRoll by viewModel.classRoll.collectAsStateWithLifecycle()
  val parentData by viewModel.parentData.collectAsStateWithLifecycle()
  val adminMetrics by viewModel.adminMetrics.collectAsStateWithLifecycle()
  val themesList by viewModel.themesList.collectAsStateWithLifecycle()

  val context = LocalContext.current
  val snackbarHostState = remember { SnackbarHostState() }
  var showThemeProposalModal by remember { mutableStateOf(false) }
  var showNotificationsModal by remember { mutableStateOf(false) }

  // Handle toast notifications
  LaunchedEffect(uiState.toastMessage) {
    uiState.toastMessage?.let { msg ->
      Toast.makeText(context, msg, Toast.LENGTH_SHORT).show()
      viewModel.clearToast()
    }
  }

  // Handle Back Navigation cleanly
  BackHandler(enabled = uiState.currentScreen != AppScreen.ONBOARDING && uiState.currentScreen != AppScreen.LOGIN) {
    when (uiState.currentScreen) {
      AppScreen.NOVA_REDACAO -> viewModel.navigateTo(AppScreen.MAIN)
      AppScreen.STATUS_CORRECAO -> viewModel.navigateTo(AppScreen.MAIN)
      AppScreen.PRE_CORRECAO -> viewModel.navigateTo(AppScreen.STATUS_CORRECAO)
      AppScreen.TEACHER_GRADE_DETAIL -> viewModel.navigateTo(AppScreen.MAIN)
      AppScreen.MAIN -> {
        if (uiState.currentRole == UserRole.ALUNO && uiState.currentTab != MainTab.HOJE) {
          viewModel.selectTab(MainTab.HOJE)
        } else {
          viewModel.logout()
        }
      }
      else -> Unit
    }
  }

  when (uiState.currentScreen) {
    AppScreen.ONBOARDING -> {
      OnboardingScreen(
        onNext = { viewModel.navigateTo(AppScreen.LOGIN) },
        onSkip = { viewModel.navigateTo(AppScreen.LOGIN) }
      )
    }

    AppScreen.LOGIN -> {
      LoginScreen(
        onLoginSuccess = { email ->
          viewModel.login(email)
        }
      )
    }

    AppScreen.NOVA_REDACAO -> {
      NovaRedacaoScreen(
        draft = draft,
        savedRepertories = repertories.filter { it.isSaved },
        isAnalyzingWithGemini = uiState.isAnalyzingWithGemini,
        structuralFeedback = uiState.structuralFeedback,
        onTextChange = { viewModel.updateDraftText(it) },
        onSendForAnalysis = { viewModel.analyzeWithGemini() },
        onDismissAnalysis = { viewModel.dismissStructuralFeedback() },
        onSendEssay = { viewModel.submitDraft() },
        onBack = { viewModel.navigateTo(AppScreen.MAIN) },
        onOpenSavedRepertories = {
          viewModel.selectFeedTab(FeedTab.SALVOS)
          viewModel.selectTab(MainTab.FEED)
        }
      )
    }

    AppScreen.STATUS_CORRECAO -> {
      StatusCorrecaoScreen(
        evaluation = evaluation,
        onBack = { viewModel.navigateTo(AppScreen.MAIN) },
        onViewPreCorrecao = { viewModel.navigateTo(AppScreen.PRE_CORRECAO) }
      )
    }

    AppScreen.PRE_CORRECAO -> {
      PreCorrecaoScreen(
        evaluation = evaluation,
        onBack = { viewModel.navigateTo(AppScreen.STATUS_CORRECAO) },
        onViewRepertories = {
          viewModel.selectFeedTab(FeedTab.PARA_VOCE)
          viewModel.selectTab(MainTab.FEED)
        },
        onRewrite = {
          viewModel.navigateTo(AppScreen.NOVA_REDACAO)
        },
        onRequestReview = {
          Toast.makeText(context, "Pedido de revisão presencial enviado ao Prof. Guilherme Ramos!", Toast.LENGTH_LONG).show()
        }
      )
    }

    AppScreen.TEACHER_GRADE_DETAIL -> {
      uiState.selectedTeacherEssay?.let { essay ->
        TeacherGradeScreen(
          essay = essay,
          onBack = { viewModel.navigateTo(AppScreen.MAIN) },
          onPublishGrade = { c1, c2, c3, c4, c5, notes ->
            viewModel.publishTeacherGrade(c1, c2, c3, c4, c5, notes)
          }
        )
      }
    }

    AppScreen.MAIN -> {
      Scaffold(
        modifier = Modifier.fillMaxSize(),
        snackbarHost = { SnackbarHost(snackbarHostState) },
        topBar = {
          RoleSwitcherBar(
            currentRole = uiState.currentRole,
            onSelectRole = { viewModel.switchRole(it) }
          )
        },
        bottomBar = {
          // Bottom Navigation is shown in student view
          if (uiState.currentRole == UserRole.ALUNO) {
            AppBottomNavigation(
              currentTab = uiState.currentTab,
              onTabSelected = { viewModel.selectTab(it) },
              onFabClick = { viewModel.navigateTo(AppScreen.NOVA_REDACAO) }
            )
          }
        }
      ) { innerPadding ->
        Box(
          modifier = Modifier
            .fillMaxSize()
            .padding(innerPadding)
        ) {
          when (uiState.currentRole) {
            UserRole.ALUNO -> {
              when (uiState.currentTab) {
                MainTab.HOJE -> {
                  HojeScreen(
                    draft = draft,
                    evaluation = evaluation,
                    viewedFeedCards = viewedCount,
                    onContinueDraft = { viewModel.navigateTo(AppScreen.NOVA_REDACAO) },
                    onViewStatus = { viewModel.navigateTo(AppScreen.STATUS_CORRECAO) },
                    onOpenFeed = { viewModel.selectTab(MainTab.FEED) },
                    onOpenThemeProposal = { showThemeProposalModal = true },
                    onNotificationsClick = { showNotificationsModal = true }
                  )
                }

                MainTab.FEED -> {
                  FeedScreen(
                    repertories = repertories,
                    currentFeedTab = uiState.feedTab,
                    currentIndex = uiState.feedCardIndex,
                    viewedCardsCount = viewedCount,
                    onSelectTab = { viewModel.selectFeedTab(it) },
                    onNextCard = { viewModel.nextFeedCard(it) },
                    onPrevCard = { viewModel.prevFeedCard(it) },
                    onToggleSave = { viewModel.toggleSaveRepertory(it) },
                    onUseRepertory = { viewModel.useRepertory(it) }
                  )
                }

                MainTab.EVOLUCAO -> {
                  EvolucaoScreen(
                    items = evolutionItems,
                    competencies = evaluation.competencies,
                    onCompetencyClick = { comp ->
                      if (comp.isAttention) {
                        viewModel.navigateTo(AppScreen.PRE_CORRECAO)
                      }
                    }
                  )
                }

                MainTab.PERFIL -> {
                  PerfilScreen(
                    profile = studentProfile,
                    onLogout = { viewModel.logout() }
                  )
                }
              }
            }

            UserRole.PROFESSOR -> {
              TeacherDashboardScreen(
                queue = teacherQueue,
                classRoll = classRoll,
                onSelectEssay = { viewModel.openTeacherGrading(it) },
                onToggleAttendance = { viewModel.toggleStudentAttendance(it) }
              )
            }

            UserRole.RESPONSAVEL -> {
              ParentDashboardScreen(
                data = parentData
              )
            }

            UserRole.ADMIN -> {
              AdminDashboardScreen(
                metrics = adminMetrics,
                themes = themesList,
                onCreateTheme = { title, category, deadline ->
                  viewModel.createTheme(title, category, deadline)
                }
              )
            }
          }
        }
      }
    }
  }

  // Theme Proposal Modal
  if (showThemeProposalModal) {
    AlertDialog(
      onDismissRequest = { showThemeProposalModal = false },
      title = { Text("Tema da Semana", color = PinkPrimary) },
      text = {
        Text("Proposta ENEM 2026:\n\n\"Saúde mental dos jovens na era digital: entre a hiperconectividade e o isolamento psíquico.\"\n\nTextos motivadores disponíveis na apostila do curso presencial e nos cards do Feed. Prazo para entrega da primeira versão: até sexta-feira às 23h59.")
      },
      confirmButton = {
        TextButton(
          onClick = {
            showThemeProposalModal = false
            viewModel.navigateTo(AppScreen.NOVA_REDACAO)
          }
        ) {
          Text("Escrever Agora", color = PinkPrimary)
        }
      },
      dismissButton = {
        TextButton(onClick = { showThemeProposalModal = false }) {
          Text("Fechar")
        }
      }
    )
  }

  // Notifications Modal
  if (showNotificationsModal) {
    AlertDialog(
      onDismissRequest = { showNotificationsModal = false },
      title = { Text("Notificações do Curso Presencial") },
      text = {
        Text("• 09:13 - Pré-correção por IA da sua redação sobre Saúde Mental já está disponível para consulta.\n\n• Ontem - Lembrete: Aula prática de Proposta de Intervenção neste sábado às 08h00 na Sala 14.\n\n• 03/Nov - Novo repertório adicionado ao Feed: \"Sociedade do Cansaço\".")
      },
      confirmButton = {
        TextButton(onClick = { showNotificationsModal = false }) {
          Text("Entendido", color = PinkPrimary)
        }
      }
    )
  }
}
