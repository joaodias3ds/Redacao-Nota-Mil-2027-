package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowBack
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.api.StructuralFeedback
import com.example.data.model.EssayDraft
import com.example.data.model.RepertoryCard
import com.example.data.repository.EssayRepository
import com.example.ui.theme.BorderLight
import com.example.ui.theme.DarkCardBg
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NovaRedacaoScreen(
  draft: EssayDraft,
  savedRepertories: List<RepertoryCard>,
  isAnalyzingWithGemini: Boolean,
  structuralFeedback: StructuralFeedback?,
  onTextChange: (String) -> Unit,
  onSendForAnalysis: () -> Unit,
  onDismissAnalysis: () -> Unit,
  onSendEssay: () -> Unit,
  onBack: () -> Unit,
  onOpenSavedRepertories: () -> Unit,
  modifier: Modifier = Modifier
) {
  val scrollState = rememberScrollState()
  val estimatedLines = EssayRepository.calculateEstimatedLines(draft.text).coerceAtLeast(18)
  val maxLines = draft.targetLines
  val minRecommended = draft.minRecommendedLines

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color.White)
      .statusBarsPadding()
      .imePadding()
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp)
      .padding(top = 10.dp, bottom = 100.dp)
  ) {
    // Top Bar: Back, "Nova redação", Subtitle, "Enviar" Button
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(bottom = 16.dp),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      IconButton(
        onClick = onBack,
        modifier = Modifier
          .size(40.dp)
          .testTag("nova_redacao_back")
      ) {
        Icon(
          imageVector = Icons.AutoMirrored.Outlined.ArrowBack,
          contentDescription = "Voltar",
          tint = TextPrimary
        )
      }

      Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
          text = "Nova redação",
          color = TextPrimary,
          fontSize = 17.sp,
          fontWeight = FontWeight.Bold
        )
        Text(
          text = draft.lastSaved,
          color = TextSecondary,
          fontSize = 12.sp
        )
      }

      // "Enviar" pill button (Oficial para o professor)
      Button(
        onClick = onSendEssay,
        modifier = Modifier
          .height(38.dp)
          .testTag("btn_enviar_redacao"),
        shape = RoundedCornerShape(19.dp),
        colors = ButtonDefaults.buttonColors(
          containerColor = PinkPrimary,
          contentColor = Color.White
        )
      ) {
        Text(
          text = "Enviar",
          fontSize = 14.sp,
          fontWeight = FontWeight.SemiBold
        )
      }
    }

    // Card TEMA
    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(16.dp))
        .testTag("card_tema_banner"),
      shape = RoundedCornerShape(16.dp),
      color = Color(0xFFFFF0F5)
    ) {
      Column(modifier = Modifier.padding(16.dp)) {
        Text(
          text = "TEMA",
          color = PinkPrimary,
          fontSize = 11.sp,
          fontWeight = FontWeight.Bold,
          letterSpacing = 0.8.sp
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
          text = draft.theme,
          color = TextPrimary,
          fontSize = 16.sp,
          fontWeight = FontWeight.Bold,
          lineHeight = 22.sp
        )
      }
    }

    Spacer(modifier = Modifier.height(18.dp))

    // Section "Seu texto" & "Send for Analysis" Button
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Text(
        text = "Seu texto",
        color = TextPrimary,
        fontSize = 15.sp,
        fontWeight = FontWeight.SemiBold
      )

      // Send for Analysis with Gemini AI Button
      Button(
        onClick = onSendForAnalysis,
        enabled = !isAnalyzingWithGemini && draft.text.isNotBlank(),
        modifier = Modifier
          .height(36.dp)
          .testTag("btn_send_for_analysis"),
        shape = RoundedCornerShape(18.dp),
        colors = ButtonDefaults.buttonColors(
          containerColor = Color(0xFF1E1E24),
          contentColor = Color.White
        )
      ) {
        if (isAnalyzingWithGemini) {
          CircularProgressIndicator(
            modifier = Modifier.size(16.dp),
            color = Color.White,
            strokeWidth = 2.dp
          )
          Spacer(modifier = Modifier.width(6.dp))
          Text("Analisando...", fontSize = 12.sp)
        } else {
          Icon(
            imageVector = Icons.Default.AutoAwesome,
            contentDescription = null,
            tint = Color(0xFFF472B6),
            modifier = Modifier.size(15.dp)
          )
          Spacer(modifier = Modifier.width(6.dp))
          Text(
            text = "Analisar com IA",
            fontSize = 12.sp,
            fontWeight = FontWeight.SemiBold
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(10.dp))

    // Text Editor Box
    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(16.dp)),
      shape = RoundedCornerShape(16.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
    ) {
      Box(
        modifier = Modifier
          .fillMaxWidth()
          .padding(16.dp)
      ) {
        BasicTextField(
          value = draft.text,
          onValueChange = onTextChange,
          modifier = Modifier
            .fillMaxWidth()
            .height(260.dp)
            .testTag("input_essay_text"),
          textStyle = TextStyle(
            color = TextPrimary,
            fontSize = 15.sp,
            lineHeight = 24.sp
          ),
          cursorBrush = SolidColor(PinkPrimary),
          decorationBox = { innerTextField ->
            if (draft.text.isEmpty()) {
              Text(
                text = "Comece a escrever sua introdução, contextualizando o tema e apresentando sua tese...",
                color = TextMuted,
                fontSize = 15.sp,
                lineHeight = 24.sp
              )
            }
            innerTextField()
          }
        )
      }
    }

    Spacer(modifier = Modifier.height(14.dp))

    // Line Count Indicators
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Text(
        text = "$estimatedLines de $maxLines linhas",
        color = TextPrimary,
        fontSize = 13.sp,
        fontWeight = FontWeight.SemiBold
      )

      Text(
        text = "Mínimo recomendado: $minRecommended linhas",
        color = TextSecondary,
        fontSize = 13.sp
      )
    }

    Spacer(modifier = Modifier.height(8.dp))

    // Progress bar for lines
    LinearProgressIndicator(
      progress = { (estimatedLines.toFloat() / maxLines.toFloat()).coerceIn(0f, 1f) },
      modifier = Modifier
        .fillMaxWidth()
        .height(6.dp)
        .clip(RoundedCornerShape(3.dp)),
      color = PinkPrimary,
      trackColor = Color(0xFFF3F4F6),
      strokeCap = StrokeCap.Round
    )

    Spacer(modifier = Modifier.height(28.dp))

    // Section "Repertório que você salvou"
    Text(
      text = "Repertório que você salvou",
      color = PinkPrimary,
      fontSize = 14.sp,
      fontWeight = FontWeight.Bold
    )

    Spacer(modifier = Modifier.height(12.dp))

    // Saved Chips Row
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(10.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      val firstSaved = savedRepertories.firstOrNull()
      val chipLabel = firstSaved?.title ?: "Modernidade líquida"

      Surface(
        modifier = Modifier
          .clip(RoundedCornerShape(20.dp))
          .clickable {
            if (!draft.text.contains(chipLabel)) {
              onTextChange(draft.text + "\n\nSob a ótica de Zygmunt Bauman em \"Modernidade líquida\", ")
            }
          }
          .testTag("chip_repertorio_salvo"),
        shape = RoundedCornerShape(20.dp),
        color = DarkCardBg
      ) {
        Text(
          text = chipLabel,
          color = Color.White,
          fontSize = 13.sp,
          fontWeight = FontWeight.Medium,
          modifier = Modifier.padding(horizontal = 16.dp, vertical = 9.dp)
        )
      }

      Surface(
        modifier = Modifier
          .clip(RoundedCornerShape(20.dp))
          .clickable(onClick = onOpenSavedRepertories)
          .testTag("chip_ver_salvos"),
        shape = RoundedCornerShape(20.dp),
        color = Color.White,
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
      ) {
        Text(
          text = "+ Ver salvos",
          color = TextPrimary,
          fontSize = 13.sp,
          fontWeight = FontWeight.Medium,
          modifier = Modifier.padding(horizontal = 16.dp, vertical = 9.dp)
        )
      }
    }
  }

  // Structural Feedback Modal from Gemini AI
  structuralFeedback?.let { feedback ->
    AlertDialog(
      onDismissRequest = onDismissAnalysis,
      title = {
        Row(
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
          Icon(
            imageVector = Icons.Default.AutoAwesome,
            contentDescription = null,
            tint = PinkPrimary,
            modifier = Modifier.size(24.dp)
          )
          Text(
            text = "Análise Estrutural (Gemini IA)",
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp
          )
        }
      },
      text = {
        Column(
          modifier = Modifier.verticalScroll(rememberScrollState()),
          verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
          // Score pill
          Surface(
            shape = RoundedCornerShape(12.dp),
            color = Color(0xFFFFF0F5)
          ) {
            Row(
              modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp),
              verticalAlignment = Alignment.CenterVertically,
              horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
              Text(
                text = "Estimativa Estrutural:",
                fontSize = 13.sp,
                fontWeight = FontWeight.Medium
              )
              Text(
                text = "${feedback.totalScore}/1000",
                color = PinkPrimary,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold
              )
            }
          }

          // Structural parts
          StructureSectionItem("Introdução", feedback.introducaoFeedback)
          StructureSectionItem("Desenvolvimento 1", feedback.d1Feedback)
          StructureSectionItem("Desenvolvimento 2", feedback.d2Feedback)
          StructureSectionItem("Proposta de Intervenção", feedback.conclusaoFeedback)

          // Attention point
          Surface(
            shape = RoundedCornerShape(12.dp),
            color = DarkCardBg
          ) {
            Column(modifier = Modifier.padding(12.dp)) {
              Text(
                text = "PONTO DE ATENÇÃO",
                color = Color(0xFFF472B6),
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold
              )
              Spacer(modifier = Modifier.height(4.dp))
              Text(
                text = feedback.pontoAtencao,
                color = Color.White,
                fontSize = 13.sp,
                lineHeight = 18.sp
              )
            }
          }
        }
      },
      confirmButton = {
        Button(
          onClick = {
            onDismissAnalysis()
            onSendEssay()
          },
          colors = ButtonDefaults.buttonColors(containerColor = PinkPrimary)
        ) {
          Text("Enviar para o Professor")
        }
      },
      dismissButton = {
        TextButton(onClick = onDismissAnalysis) {
          Text("Continuar Editando", color = TextSecondary)
        }
      }
    )
  }
}

@Composable
private fun StructureSectionItem(title: String, comment: String) {
  Column {
    Row(
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(6.dp)
    ) {
      Icon(
        imageVector = Icons.Outlined.CheckCircle,
        contentDescription = null,
        tint = PinkPrimary,
        modifier = Modifier.size(16.dp)
      )
      Text(
        text = title,
        fontWeight = FontWeight.Bold,
        fontSize = 13.sp,
        color = TextPrimary
      )
    }
    Spacer(modifier = Modifier.height(2.dp))
    Text(
      text = comment,
      fontSize = 13.sp,
      color = TextSecondary,
      lineHeight = 18.sp
    )
  }
}
